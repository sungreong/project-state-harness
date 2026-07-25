# Project State Checks

## Structural Checks

- Required context, processed, state, and view files exist.
- Raw evidence has the required frontmatter.
- Facts, actions, decisions, issues, and dependencies link back to a source.
- The latest brief names its update date and evidence set.

## Attention Checks

Flag an item when one or more conditions apply:

| Signal | Meaning | Result |
| --- | --- | --- |
| WBS exit criterion lacks evidence | A phase may appear complete without proof | `unknown` or `blocked` |
| Action lacks owner or due date | A commitment can disappear | open question |
| Meeting action is not linked to a WBS item or issue | Follow-up is likely to be missed | attention item |
| Dependency owner or status is unknown | Schedule impact cannot be assessed | blocker candidate |
| Latest source is older than the agreed freshness window | State may be stale | freshness warning |
| Development input is incomplete | Work should not be presented as ready | `not-ready` with missing inputs |

## Development Readiness

Mark a work item `ready` only when its needed inputs are known or explicitly waived:

- intent and acceptance condition
- owner and reviewer
- dependency/API or interface contract
- design or UI decision when applicable
- test or QA condition
- deployment or rollout decision when applicable

Do not treat a vague request as ready merely because it has a due date.
