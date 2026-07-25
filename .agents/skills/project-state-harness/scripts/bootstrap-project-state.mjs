#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};

const target = valueFor('--target');
if (!target) {
  console.error('Usage: node bootstrap-project-state.mjs --target <project-state-path> [--project-name <name>] [--goal <goal>] [--owner <owner>]');
  process.exit(2);
}

const absoluteTarget = path.resolve(target);
if (fs.existsSync(absoluteTarget)) {
  console.error(`Target already exists: ${absoluteTarget}`);
  console.error('Refusing to overwrite an existing project state. Choose a new path or merge intentionally.');
  process.exit(1);
}

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const template = path.resolve(scriptDirectory, '..', 'assets', 'project-state-template');
fs.cpSync(template, absoluteTarget, { recursive: true, errorOnExist: true });

const projectFile = path.join(absoluteTarget, 'context', 'project.yml');
let project = fs.readFileSync(projectFile, 'utf8');
const replacements = [
  ['project_name', valueFor('--project-name')],
  ['project_goal', valueFor('--goal')],
  ['project_owner', valueFor('--owner')],
];
for (const [key, value] of replacements) {
  if (value) project = project.replace(`${key}: "{{${key}}}"`, `${key}: ${JSON.stringify(value)}`);
}
project = project.replace('last_updated: "{{last_updated_yyyy-mm-dd}}"', `last_updated: ${JSON.stringify(new Date().toISOString().slice(0, 10))}`);
fs.writeFileSync(projectFile, project, 'utf8');

console.log(`Created project state: ${absoluteTarget}`);
