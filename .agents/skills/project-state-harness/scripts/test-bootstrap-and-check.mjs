#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'project-state-harness-'));
const target = path.join(tempDirectory, 'project-state');

try {
  const bootstrap = spawnSync(process.execPath, [path.join(scriptDirectory, 'bootstrap-project-state.mjs'), '--target', target, '--project-name', 'Scenario Test', '--goal', 'Verify bootstrap', '--owner', 'Test User'], { encoding: 'utf8' });
  if (bootstrap.status !== 0) throw new Error(bootstrap.stderr || bootstrap.stdout);

  const projectConfig = fs.readFileSync(path.join(target, 'context', 'project.yml'), 'utf8');
  for (const expectedValue of ['project_name: "Scenario Test"', 'project_goal: "Verify bootstrap"', 'project_owner: "Test User"']) {
    if (!projectConfig.includes(expectedValue)) throw new Error(`Bootstrap did not set ${expectedValue}`);
  }

  for (const requiredFile of ['harness/manifest.yml', 'harness/question-ledger.md', 'harness/handoffs.md', 'harness/run-log.md', 'state/schedule-assessment.md']) {
    if (!fs.existsSync(path.join(target, requiredFile))) throw new Error(`Bootstrap missed ${requiredFile}`);
  }

  const validEvidence = path.join(target, 'raw', 'meetings', '2026-07-25-kickoff.md');
  fs.writeFileSync(validEvidence, '---\nsource_id: SRC-20260725-001\nsource_type: meeting-note\nsource_ref: Kickoff meeting\ncaptured_at: 2026-07-25\n---\n\n# Kickoff\n', 'utf8');

  const check = spawnSync(process.execPath, [path.join(scriptDirectory, 'check-project-state.mjs'), '--root', target, '--strict'], { encoding: 'utf8' });
  if (check.status !== 0) throw new Error(check.stderr || check.stdout);

  const manifest = path.join(target, 'harness', 'manifest.yml');
  fs.writeFileSync(manifest, fs.readFileSync(manifest, 'utf8').replace('lifecycle: intake', 'lifecycle: baseline'), 'utf8');
  const unresolvedConfig = spawnSync(process.execPath, [path.join(scriptDirectory, 'check-project-state.mjs'), '--root', target, '--strict'], { encoding: 'utf8' });
  if (unresolvedConfig.status === 0) throw new Error('Baseline with unresolved configuration unexpectedly passed strict check.');
  fs.writeFileSync(manifest, fs.readFileSync(manifest, 'utf8').replace('lifecycle: baseline', 'lifecycle: intake'), 'utf8');

  const invalidEvidence = path.join(target, 'raw', 'updates', 'invalid.md');
  fs.writeFileSync(invalidEvidence, '# Missing evidence metadata\n', 'utf8');
  const invalidCheck = spawnSync(process.execPath, [path.join(scriptDirectory, 'check-project-state.mjs'), '--root', target, '--strict'], { encoding: 'utf8' });
  if (invalidCheck.status === 0) throw new Error('Invalid evidence unexpectedly passed strict check.');

  console.log('PASS: Bootstrap creates a valid project state and strict check rejects invalid evidence.');
} finally {
  fs.rmSync(tempDirectory, { recursive: true, force: true });
}
