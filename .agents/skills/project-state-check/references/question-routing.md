# Question Routing

| Situation | Ask | Record in |
| --- | --- | --- |
| Action has no owner | Who owns the follow-up? | `state/open-questions.md` and `processed/actions.md` |
| WBS exit has no evidence | What artifact or approval proves this phase is done? | `state/open-questions.md` |
| Dependency is stuck | Who controls the predecessor and what is the expected response date? | `processed/dependencies.md` and `state/risks.md` |
| Source conflict | Which source is authoritative as of which date? | `state/open-questions.md` |
| Work is not development-ready | Which input is missing: intent, interface, review, QA, or rollout? | `state/dev-readiness.md` |

## Scenario: No Update for a Week

Mark the item stale only if it exceeds `freshness_window_days`. Ask for current status before predicting delay.

## Scenario: A Deadline Is Near but Completion Is Vague

Ask for the exit evidence and approver. Do not ask for a generic status update.

## Scenario: Several Problems Exist

Ask first about the blocker that affects the nearest milestone or the most downstream work. Keep the rest in the attention list.
