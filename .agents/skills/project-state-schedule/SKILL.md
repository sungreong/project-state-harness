---
name: project-state-schedule
description: Assess project dates, sequencing, and deadline risk from a project-state workspace with explicit evidence, assumptions, and cautions. Use when a user asks whether a date is realistic, what must happen before a milestone, how a delay affects work, or what schedule information is missing.
---

# Project State Schedule

Assess dates as evidence-backed scenarios. Never turn a target date into a commitment without the required facts.

## Workflow

1. Read `references/schedule-guardrails.md`, `../project-state-harness/references/schema.md`, and the project WBS, dependencies, risks, and open questions. Run the core project-state check first.
2. If representative schedule type/date, current WBS exit criteria, related-team dependency, or freshness is incomplete, record the gaps in `harness/requirements-status.md`, ask up to three questions, and return only a provisional assessment. Do not describe the date as a commitment.
3. Distinguish the requested date type: target, internal commitment, external commitment, or release window. If unknown, ask it before forecasting.
4. Identify the next WBS exit condition, predecessor dependencies, owner availability, review/QA condition, and change approval needed to reach the date.
5. Write `state/schedule-assessment.md` with known evidence, assumptions, cautions, a confidence label, and recommendation. Open no more than three P0/P1 questions in the question ledger.
6. Run `node ../project-state-harness/scripts/check-schedule-assessment.mjs --file <project-state>/state/schedule-assessment.md` before handing off.
7. Add a handoff entry and recommend `project-state-check` if material inputs are missing, or `project-state-brief` if the state is coherent.

## Required Answer Shape

Every schedule answer must contain:

- requested date and date type
- known evidence and as-of date
- assumptions and unknowns
- dependencies and exit criteria
- schedule cautions
- confidence: `high`, `medium`, or `low`
- next action and question IDs

Do not give a binary yes/no answer when confidence is low.
