#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'project-state-baseline-'));
const target = path.join(tempDirectory, 'project-state');
const today = new Date().toISOString().slice(0, 10);

try {
  const bootstrap = spawnSync(process.execPath, [path.join(scriptDirectory, 'bootstrap-project-state.mjs'), '--target', target, '--project-name', 'Ready Scenario', '--goal', 'Verify baseline gate', '--owner', 'Test User'], { encoding: 'utf8' });
  if (bootstrap.status !== 0) throw new Error(bootstrap.stderr || bootstrap.stdout);

  const projectFile = path.join(target, 'context', 'project.yml');
  let project = fs.readFileSync(projectFile, 'utf8');
  project = project.replace('{{status_as_of_yyyy-mm-dd}}', today);
  project = project.replace(/\{\{[a-z0-9_-]+\}\}/g, 'configured');
  fs.writeFileSync(projectFile, project, 'utf8');

  const agentsFile = path.join(target, 'AGENTS.md');
  let agents = fs.readFileSync(agentsFile, 'utf8');
  agents = agents.replace(/\{\{(?!daily_email_enabled_true_or_false|daily_email_recipient|daily_email_send_time_hh-mm)[a-z0-9_-]+\}\}/g, 'configured');
  fs.writeFileSync(agentsFile, agents, 'utf8');

  const manifestFile = path.join(target, 'harness', 'manifest.yml');
  let manifest = fs.readFileSync(manifestFile, 'utf8');
  manifest = manifest.replace('lifecycle: intake', 'lifecycle: baseline').replace('configuration_status: incomplete', 'configuration_status: ready').replace('last_preflight: YYYY-MM-DD', `last_preflight: ${today}`);
  fs.writeFileSync(manifestFile, manifest, 'utf8');

  const check = spawnSync(process.execPath, [path.join(scriptDirectory, 'check-project-state.mjs'), '--root', target, '--strict'], { encoding: 'utf8' });
  if (check.status !== 0) throw new Error(check.stderr || check.stdout);

  console.log('PASS: Fully configured baseline passes the strict project-state gate.');
} finally {
  fs.rmSync(tempDirectory, { recursive: true, force: true });
}
