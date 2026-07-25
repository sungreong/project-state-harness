#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'index-pipeline-scenario-'));
const target = path.join(tempDirectory, 'project-state');

function run(script, scriptArgs) {
  const result = spawnSync(process.execPath, [path.join(scriptDirectory, script), ...scriptArgs], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
}

try {
  run('bootstrap-project-state.mjs', ['--target', target, '--project-name', 'Index Pipeline', '--goal', 'Design and develop an index pipeline', '--owner', 'Delivery Owner']);

  const ledger = path.join(target, 'harness', 'question-ledger.md');
  fs.appendFileSync(ledger, '| Q-001 | P0 | milestone | What must exist in six weeks: design approval, validated pipeline, or production release? | asked | none | project-state-schedule |\n', 'utf8');
  fs.appendFileSync(ledger, '| Q-002 | P0 | dependency | Who owns source-data access and by when? | asked | none | project-state-check |\n', 'utf8');

  const evidence = path.join(target, 'raw', 'meetings', '2026-07-25-index-kickoff.md');
  fs.writeFileSync(evidence, '---\nsource_id: SRC-20260725-INDEX-001\nsource_type: meeting-note\nsource_ref: Index pipeline kickoff\ncaptured_at: 2026-07-25\n---\n\n# Kickoff\n\nThe target date is six weeks away. Source access and release owner are undecided.\n', 'utf8');

  const assessment = path.join(target, 'state', 'schedule-assessment.md');
  fs.writeFileSync(assessment, '# Schedule Assessment\n\n## Requested Date or Sequence\nSix-week target; date type is target.\n\n## Known Evidence\nSRC-20260725-INDEX-001 states source access and release owner are undecided.\n\n## Assumptions and Unknowns\nData contract, test data, and acceptance metric are unknown.\n\n## Schedule Cautions\nImplementation start is not release readiness.\n\n## Confidence\nlow\n\n## Recommendation\nUse a design and access milestone before committing to release.\n\n## Related Questions\nQ-001, Q-002\n', 'utf8');

  run('check-project-state.mjs', ['--root', target, '--strict']);
  run('check-schedule-assessment.mjs', ['--file', assessment]);

  fs.writeFileSync(assessment, '# Schedule Assessment\n\n## Requested Date or Sequence\nTarget\n', 'utf8');
  const invalid = spawnSync(process.execPath, [path.join(scriptDirectory, 'check-schedule-assessment.mjs'), '--file', assessment], { encoding: 'utf8' });
  if (invalid.status === 0) throw new Error('Incomplete schedule assessment unexpectedly passed.');

  console.log('PASS: Index pipeline scenario keeps the target conditional and rejects a schedule answer without cautions.');
} finally {
  fs.rmSync(tempDirectory, { recursive: true, force: true });
}
