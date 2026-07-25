#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'project-state-notify-'));
const target = path.join(tempDirectory, 'project-state');

try {
  const bootstrap = spawnSync(process.execPath, [path.join(scriptDirectory, 'bootstrap-project-state.mjs'), '--target', target], { encoding: 'utf8' });
  if (bootstrap.status !== 0) throw new Error(bootstrap.stderr || bootstrap.stdout);

  const notifications = path.join(target, 'harness', 'notifications.yml');
  fs.writeFileSync(notifications, fs.readFileSync(notifications, 'utf8').replace('enabled: false', 'enabled: true'), 'utf8');
  const check = spawnSync(process.execPath, [path.join(scriptDirectory, 'check-project-state.mjs'), '--root', target, '--strict'], { encoding: 'utf8' });
  if (check.status === 0) throw new Error('Enabled daily email without recipient and approval unexpectedly passed strict check.');
  if (!check.stdout.includes('Daily email is enabled')) throw new Error(check.stdout);

  console.log('PASS: Daily email delivery is blocked until configuration and approval are complete.');
} finally {
  fs.rmSync(tempDirectory, { recursive: true, force: true });
}
