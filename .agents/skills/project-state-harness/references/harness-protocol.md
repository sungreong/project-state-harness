# Harness Protocol

## Lifecycle

```text
intake -> baseline -> evidence -> reconcile -> awaiting-user -> monitoring
```

Move to `awaiting-user` whenever a P0 answer is required. Do not fabricate an answer merely to complete a brief.

## Role Contracts

| Role | Reads | Writes | Must not do |
| --- | --- | --- | --- |
| Setup | user answers, template | `context/`, question ledger, manifest | invent a complete WBS |
| Ingest | source material, context | `raw/`, `processed/`, handoff | infer completion from a target date |
| Schedule | WBS, dependencies, availability, exit criteria | schedule assessment, questions, handoff | promise a date without stated assumptions |
| Check | all state and latest sources | state, question ledger, handoff | ask more than three questions at once |
| Brief | coherent context, processed, state | views, handoff | create new facts |
| Notify | notification settings, current brief, requirement status | email draft, notification log, handoff | send without approval or a ready baseline |

## Handoff Minimum

Every role writes one handoff row containing:

- source IDs or question IDs used
- files changed
- facts versus assumptions added
- open P0/P1 question IDs
- recommended next role

## Q&A Loop

1. Ask the smallest set of questions that can change the next action.
2. Record each question before asking it.
3. When the user answers, keep the answer text or source reference in the ledger.
4. Update only the records affected by the answer.
5. Mark the question `answered`, then resume the intended role.

## Continuous Guard

Before a role runs and after it changes state, inspect baseline configuration,
open questions, and freshness. Keep the lifecycle in `intake` or
`awaiting-user` when a required value is missing or stale. Update
`harness/requirements-status.md` with the question that must be answered before
the role can make a trusted completion, schedule, or delivery claim.
