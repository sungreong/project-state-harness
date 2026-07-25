#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const rootIndex = args.indexOf('--root');
const root = rootIndex >= 0 ? args[rootIndex + 1] : null;
const strict = args.includes('--strict');

if (!root) {
  console.error('Usage: node check-project-state.mjs --root <project-state-path> [--strict]');
  process.exit(2);
}

const requiredFiles = [
  'AGENTS.md',
  'context/project.yml',
  'context/operating-model.md',
  'harness/manifest.yml',
  'harness/question-ledger.md',
  'harness/handoffs.md',
  'harness/run-log.md',
  'harness/requirements-status.md',
  'harness/notifications.yml',
  'harness/notification-log.md',
  'processed/facts.md',
  'processed/actions.md',
  'processed/decisions.md',
  'processed/issues.md',
  'processed/dependencies.md',
  'state/current-state.md',
  'state/open-questions.md',
  'state/risks.md',
  'state/dev-readiness.md',
  'state/schedule-assessment.md',
  'views/latest-brief.md',
  'views/wiki.md',
  'views/daily-email-draft.md',
];

const rawDirectories = ['raw/meetings', 'raw/updates', 'raw/imports'];
const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
const errors = [];
const warnings = [];
const manifestFile = path.join(root, 'harness', 'manifest.yml');
const manifest = fs.existsSync(manifestFile) ? fs.readFileSync(manifestFile, 'utf8') : '';
const lifecycle = manifest.match(/^lifecycle:\s*(\S+)\s*$/m)?.[1];
const configurationStatus = manifest.match(/^configuration_status:\s*(\S+)\s*$/m)?.[1];

const requiredContent = [
  ['harness/manifest.yml', 'lifecycle:'],
  ['harness/question-ledger.md', '| ID | Priority | Area | Question | Status | Answer / Evidence | Next role |'],
  ['harness/handoffs.md', '| Run | Role | Input source IDs | Changed files | Open question IDs | Next role | Result |'],
];

for (const [file, marker] of requiredContent) {
  const absoluteFile = path.join(root, file);
  if (fs.existsSync(absoluteFile) && !fs.readFileSync(absoluteFile, 'utf8').includes(marker)) {
    errors.push(`Required structure is missing in ${file}: ${marker}`);
  }
}

const scalarValue = (content, key) => {
  const match = content.match(new RegExp(`^\\s*(?:-\\s*)?${key}:\\s*(?:"([^"]*)"|([^#\\n]*))\\s*$`, 'm'));
  return match ? (match[1] ?? match[2]).trim() : null;
};
const unresolved = (value) => !value || value === 'unknown' || value.includes('{{');
const projectFile = path.join(root, 'context', 'project.yml');
const project = fs.existsSync(projectFile) ? fs.readFileSync(projectFile, 'utf8') : '';

if (!lifecycle) {
  errors.push('Harness manifest is missing lifecycle.');
}

if (lifecycle && lifecycle !== 'intake') {
  const requiredConfig = [
    'project_name', 'project_goal', 'project_owner', 'status_as_of', 'current_wbs_phase',
    'type', 'date', 'next_milestone', 'exit_criteria', 'team', 'contact',
    'expected_deliverable', 'needed_by', 'definition_of_done', 'approval_owner',
  ];
  const unresolvedConfig = requiredConfig.filter((key) => unresolved(scalarValue(project, key)));
  if (unresolvedConfig.length) errors.push(`Required project configuration is incomplete: ${unresolvedConfig.join(', ')}`);

  for (const file of ['AGENTS.md', 'context/project.yml']) {
    const absoluteFile = path.join(root, file);
    if (!fs.existsSync(absoluteFile)) continue;
    const placeholders = fs.readFileSync(absoluteFile, 'utf8').match(/\{\{[a-z0-9_-]+\}\}/g) ?? [];
    const requiredPlaceholders = placeholders.filter((placeholder) => ![
      '{{daily_email_enabled_true_or_false}}',
      '{{daily_email_recipient}}',
      '{{daily_email_send_time_hh-mm}}',
    ].includes(placeholder));
    if (requiredPlaceholders.length) errors.push(`Unresolved configuration variables in ${file}: ${[...new Set(requiredPlaceholders)].join(', ')}`);
  }
  if (configurationStatus !== 'ready') errors.push('Baseline lifecycle requires configuration_status: ready.');
}

if (lifecycle && lifecycle !== 'intake') {
  const freshnessWindow = Number.parseInt(manifest.match(/^freshness_window_days:\s*(\d+)\s*$/m)?.[1] ?? '', 10);
  const statusAsOf = scalarValue(project, 'status_as_of');
  const lastUpdated = scalarValue(project, 'last_updated');
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  for (const [label, value] of [['status_as_of', statusAsOf], ['last_updated', lastUpdated]]) {
    if (!datePattern.test(value ?? '')) {
      errors.push(`Required freshness date is invalid: ${label}`);
      continue;
    }
    if (Number.isFinite(freshnessWindow)) {
      const ageDays = Math.floor((Date.now() - Date.parse(`${value}T00:00:00Z`)) / 86_400_000);
      if (ageDays > freshnessWindow) warnings.push(`State is stale: ${label} is ${ageDays} days old (window: ${freshnessWindow}).`);
    }
  }
}

const notificationsFile = path.join(root, 'harness', 'notifications.yml');
if (fs.existsSync(notificationsFile)) {
  const notifications = fs.readFileSync(notificationsFile, 'utf8');
  if (/^\s*enabled:\s*true\s*$/m.test(notifications)) {
    const recipient = notifications.match(/^\s*-\s*"?([^"\n]+)"?\s*$/m)?.[1]?.trim();
    const timezone = scalarValue(notifications, 'timezone');
    const sendAt = scalarValue(notifications, 'send_at');
    const approval = scalarValue(notifications, 'delivery_approval');
    if (unresolved(recipient) || !recipient.includes('@')) errors.push('Daily email is enabled without a valid recipient.');
    if (unresolved(timezone)) errors.push('Daily email is enabled without a timezone.');
    if (unresolved(sendAt) || !/^\d{2}:\d{2}$/.test(sendAt)) errors.push('Daily email is enabled without a HH:MM send time.');
    if (approval !== 'approved') errors.push('Daily email is enabled without delivery_approval: approved.');
    if (configurationStatus !== 'ready') errors.push('Daily email is enabled before the project baseline is ready.');
  }
}

for (const directory of rawDirectories) {
  const absoluteDirectory = path.join(root, directory);
  if (!fs.existsSync(absoluteDirectory)) {
    errors.push(`Missing raw directory: ${directory}`);
    continue;
  }

  for (const entry of fs.readdirSync(absoluteDirectory, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name.startsWith('_')) continue;
    const relativeFile = path.join(directory, entry.name);
    const content = fs.readFileSync(path.join(absoluteDirectory, entry.name), 'utf8');
    if (!content.startsWith('---\n')) {
      errors.push(`Raw evidence has no frontmatter: ${relativeFile}`);
      continue;
    }
    for (const key of ['source_id:', 'source_type:', 'source_ref:', 'captured_at:']) {
      if (!content.includes(key)) errors.push(`Raw evidence is missing ${key.slice(0, -1)}: ${relativeFile}`);
    }
  }
}

for (const file of ['processed/actions.md', 'processed/issues.md', 'state/open-questions.md']) {
  const absoluteFile = path.join(root, file);
  if (!fs.existsSync(absoluteFile)) continue;
  const content = fs.readFileSync(absoluteFile, 'utf8');
  if (content.includes('TBD')) warnings.push(`Replace TBD placeholders before relying on ${file}`);
}

console.log('# Project State Harness Check');
console.log(`Root: ${path.resolve(root)}`);

if (missing.length) {
  console.log('\n## Missing required files');
  missing.forEach((file) => console.log(`- ${file}`));
}

if (errors.length) {
  console.log('\n## Errors');
  errors.forEach((message) => console.log(`- ${message}`));
}

if (warnings.length) {
  console.log('\n## Warnings');
  warnings.forEach((message) => console.log(`- ${message}`));
}

if (!missing.length && !errors.length && !warnings.length) {
  console.log('\nPASS: Required structure and evidence metadata are present.');
} else if (!missing.length && !errors.length) {
  console.log('\nPASS WITH WARNINGS: Resolve warnings before using this as a trusted project brief.');
} else {
  console.log('\nFAIL: Repair missing files or evidence metadata.');
}

if (strict && (missing.length || errors.length || warnings.length)) process.exit(1);
