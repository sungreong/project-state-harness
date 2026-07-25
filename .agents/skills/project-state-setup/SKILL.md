---
name: project-state-setup
description: Start a personal project-state workspace through a short guided Q&A, including directly initializing a cloned project-state template. Use when a user says they are starting a project, have a WBS but incomplete context, want to set up project tracking, or need to capture company-specific completion and approval rules before managing meetings or updates.
---

# Project State Setup

Create the first usable project state without pretending the user already knows every detail.

## Workflow

1. Read `references/question-flow.md`, the core schema at `../project-state-harness/references/schema.md`, and the harness protocol at `../project-state-harness/references/harness-protocol.md`.
2. Determine the setup mode before asking questions.
   - **Cloned-template mode:** The current folder contains `AGENTS.md`,
     `context/project.yml`, and `harness/manifest.yml`, with an `intake`
     lifecycle or `TBD` baseline values. This is already the project-state root.
     Update it in place. Never create a child folder and never run bootstrap.
   - **New-folder mode:** The user explicitly asks for a state folder in a blank
     parent directory. Confirm the new target path, then use
     `../project-state-harness/scripts/bootstrap-project-state.mjs`. Never
     overwrite an existing directory.
3. Ask no more than three questions in one turn. Start with project goal, time boundary, and WBS or next milestone.
4. Record missing answers as `unknown`; do not block setup on optional detail.
5. Ask the next questions only when they change current-state or readiness assessment: owner, collaborating team, definition of done, approval, dependency, or freshness expectation.
6. Record each question and answer in the active root's `harness/question-ledger.md`; move the lifecycle to `baseline` only when the first WBS or next milestone is known.
7. Populate the active root's `context/project.yml`, `context/operating-model.md`, and first `views/latest-brief.md` from the Q&A. Mark inferred content as `assumed`.
8. Add a setup handoff and run the core strict check against the active root after setup.

## Output

Return the current known scope, unknown items, and the first three questions or actions that should be resolved next. Do not claim a WBS phase is complete without evidence.
