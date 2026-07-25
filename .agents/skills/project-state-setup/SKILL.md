---
name: project-state-setup
description: Start a personal project-state workspace through a short guided Q&A. Use when a user says they are starting a project, have a WBS but incomplete context, want to set up project tracking, or need to capture company-specific completion and approval rules before managing meetings or updates.
---

# Project State Setup

Create the first usable project state without pretending the user already knows every detail.

## Workflow

1. Read `references/question-flow.md`, the core schema at `../project-state-harness/references/schema.md`, and the harness protocol at `../project-state-harness/references/harness-protocol.md`.
2. Ask no more than three questions in one turn. Start with project goal, time boundary, and WBS or next milestone.
3. Record missing answers as `unknown`; do not block setup on optional detail.
4. Ask the next questions only when they change current-state or readiness assessment: owner, collaborating team, definition of done, approval, dependency, or freshness expectation.
5. Confirm the target path before creating it. Use `../project-state-harness/scripts/bootstrap-project-state.mjs` and never overwrite an existing folder.
6. Record each question and answer in `harness/question-ledger.md`; move the lifecycle to `baseline` only when the first WBS or next milestone is known.
7. Populate `context/project.yml`, `context/operating-model.md`, and the first `views/latest-brief.md` from the Q&A. Mark inferred content as `assumed`.
8. Add a setup handoff and run the core strict check after setup.

## Output

Return the current known scope, unknown items, and the first three questions or actions that should be resolved next. Do not claim a WBS phase is complete without evidence.
