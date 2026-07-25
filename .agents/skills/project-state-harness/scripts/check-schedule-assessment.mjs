#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const fileIndex = args.indexOf('--file');
const file = fileIndex >= 0 ? args[fileIndex + 1] : null;

if (!file) {
  console.error('Usage: node check-schedule-assessment.mjs --file <schedule-assessment.md>');
  process.exit(2);
}

const absoluteFile = path.resolve(file);
if (!fs.existsSync(absoluteFile)) {
  console.error(`Missing schedule assessment: ${absoluteFile}`);
  process.exit(1);
}

const content = fs.readFileSync(absoluteFile, 'utf8');
const requiredSections = [
  '## Requested Date or Sequence',
  '## Known Evidence',
  '## Assumptions and Unknowns',
  '## Schedule Cautions',
  '## Confidence',
  '## Recommendation',
  '## Related Questions',
];
const missing = requiredSections.filter((heading) => !content.includes(heading));

if (missing.length) {
  console.error('# Schedule Assessment Check');
  console.error('Missing required sections:');
  missing.forEach((heading) => console.error(`- ${heading}`));
  process.exit(1);
}

console.log(`PASS: Schedule assessment has evidence, assumptions, cautions, confidence, and next-question sections: ${absoluteFile}`);
