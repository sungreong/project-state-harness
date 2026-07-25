---
name: project-state-team-context
description: Capture and maintain the context of collaborating teams or departments for a project-state workspace through a short guided Q&A. Use when a user needs to add a partner team, clarify team contacts, deliverables, dependencies, handoffs, update cadence, team risks, or cross-team status.
---

# Project State Team Context

Make cross-team work visible without inventing information. Keep one context
file per team and a concise index for scanning all interfaces.

## Workflow

1. Read `teams/index.md`, any existing team files, `processed/dependencies.md`,
   `harness/question-ledger.md`, and `references/team-question-flow.md`.
2. If the team is new, create `teams/<stable-lowercase-slug>.md` from
   `teams/_team-template.md`. Never overwrite a different team's file.
3. Ask at most three questions at once. Start with team name and contact,
   expected deliverable or decision, and needed-by date plus current status.
4. Record each answer or `unknown` in the team file, `teams/index.md`, and the
   question ledger. Do not silently convert `unknown` into confirmed.
5. Add or update the matching record in `processed/dependencies.md` when the
   team provides a prerequisite or needs an output from this project.
6. Ask follow-up questions only when needed for reliable coordination: update
   cadence/channel, acceptance criteria, decision owner, escalation path, or
   impact of a late delivery.
7. Update `harness/requirements-status.md` when the team fills or blocks a
   required cross-team dependency. Add a handoff and run the core check.

## Output

Return the current team interface, the dependency impact, and the next one to
three questions. Route date feasibility to `project-state-schedule`; do not
promise a date from a team target alone.
