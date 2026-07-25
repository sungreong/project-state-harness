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
];

const rawDirectories = ['raw/meetings', 'raw/updates', 'raw/imports'];
const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
const errors = [];
const warnings = [];

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
