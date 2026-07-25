---
name: project-state-check
description: Check a personal project-state workspace for missed work, stale updates, missing owners, unclear dependencies, WBS exit gaps, and not-ready development work. Use when a user asks what they may be forgetting, what is blocked, what information to ask for, or whether a project is ready to move forward.
---

# Project State Check

Find the smallest set of unanswered questions that prevents reliable project control.

## Workflow

1. Read `../project-state-harness/references/checks.md`, `references/question-routing.md`, and `harness/question-ledger.md`.
2. Run the core strict structural check first. Repair missing evidence metadata before interpreting state.
3. Compare planned WBS exit criteria with actual evidence, actions, issues, and dependencies.
4. Classify each concern as `blocked`, `unknown`, `assumed`, stale, or `not-ready`; include evidence links.
5. Rank at most three questions by consequence and urgency. Add them to the question ledger before asking the user; do not dump every possible gap.
6. After answers arrive, update only the affected context, processed records, and state files. Preserve the previous uncertainty as resolved history where useful.
7. Add a check handoff and route schedule questions to `project-state-schedule` rather than giving an unsupported date answer.

## Output

Write a compact attention list with: what is missing, why it matters, who can answer, and the next action. Use `project-state-brief` only after the state is coherent.
