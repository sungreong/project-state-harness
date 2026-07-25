---
name: project-state-brief
description: Regenerate concise Markdown views from a coherent personal project-state workspace. Use when a user wants a daily or weekly project brief, a current-state wiki, a development-readiness summary, or a readable explanation of current stage, blockers, next actions, and evidence.
---

# Project State Brief

Translate the project state into a readable control surface without creating new facts.

## Workflow

1. Read `references/brief-shapes.md` and the core schema at `../project-state-harness/references/schema.md`.
2. Confirm `project-state-check` has addressed the highest-priority gaps. If an open P0 question remains in `harness/question-ledger.md`, label the brief as provisional and link the question.
3. Regenerate `views/latest-brief.md` from `context/`, `processed/`, and `state/`.
4. Regenerate `views/wiki.md` as a stable navigation view: goal, WBS, team interfaces, decisions, risks, and current state.
5. Include source IDs for claims that could change a decision. Never promote an assumption to a fact while summarizing.
6. Keep action recommendations separate from status facts and add a brief handoff.

## Output Modes

- Daily: current stage, three attention items, ready work, blocked work.
- Weekly: plan-versus-actual change, decisions needed, dependency changes, freshness concerns.
- Development: ready/not-ready work and the missing input for each not-ready item.
