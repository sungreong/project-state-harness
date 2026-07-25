#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..', '..', '..', '..');
const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'project-state-clone-'));
const cloneDirectory = path.join(tempDirectory, 'my-project-state');

const run = (command, args) => {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || `${command} failed`);
};

try {
  run('git', ['clone', '--quiet', repositoryRoot, cloneDirectory]);

  for (const requiredFile of [
    'AGENTS.md',
    'context/project.yml',
    'harness/manifest.yml',
    'harness/question-ledger.md',
    'raw/meetings/_template.md',
    'state/current-state.md',
    'views/latest-brief.md',
    '.agents/skills/project-state-setup/SKILL.md',
  ]) {
    if (!fs.existsSync(path.join(cloneDirectory, requiredFile))) {
      throw new Error(`Clone missed ${requiredFile}`);
    }
  }

  const setupSkill = fs.readFileSync(path.join(cloneDirectory, '.agents', 'skills', 'project-state-setup', 'SKILL.md'), 'utf8');
  if (!setupSkill.includes('Update it in place. Never create a child folder')) {
    throw new Error('Setup skill does not define cloned-template mode.');
  }

  run(process.execPath, [path.join(cloneDirectory, '.agents', 'skills', 'project-state-harness', 'scripts', 'check-project-state.mjs'), '--root', cloneDirectory, '--strict']);
  console.log('PASS: A clone contains a usable project-state root and in-place setup guidance.');
} finally {
  fs.rmSync(tempDirectory, { recursive: true, force: true });
}
