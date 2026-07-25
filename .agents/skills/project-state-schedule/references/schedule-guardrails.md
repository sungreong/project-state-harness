# Schedule Guardrails

## Ask These First

Ask at most three of the highest-impact gaps:

1. What exactly must be true at the requested date: a decision, demo, feature-complete build, validated release candidate, or production release?
2. Which predecessor, approval, external input, or owner is on the critical path?
3. Is this a target, an internal commitment, or an external commitment, and what makes it movable or fixed?

## Cautions to Surface

| Condition | Caution |
| --- | --- |
| Exit criteria missing | A calendar date cannot establish completion. |
| Dependency has no owner/date | The date is conditional, not forecastable. |
| Implementation starts before contract is agreed | Start date is not development readiness. |
| QA/review/release missing | Build completion is not release completion. |
| Calendar availability only | Free time is not capacity or approval availability. |
| Source is stale | Forecast confidence must be reduced. |
| Timezone or business-day boundary matters | State the assumed timezone and working calendar. |

## Scenario: Index Pipeline in Six Weeks

Before treating six weeks as feasible, check source access, schema/data contract, expected volume, environment, acceptance metric, test data, reviewer, and release owner. Until the critical unknowns are answered, label the date `target / low confidence` and recommend a nearer design or access milestone.
