# Requirements Status

Updated: YYYY-MM-DD

| Requirement | Source | Status | Last checked | Open question | Notes |
| --- | --- | --- | --- | --- | --- |
| Project name and owner | `context/project.yml` | missing | YYYY-MM-DD | Q-001 | Replace template values. |
| Outcome and status-as-of date | `context/project.yml` | missing | YYYY-MM-DD | Q-002 | Needed for a current brief. |
| Representative schedule and next milestone | `context/project.yml` | missing | YYYY-MM-DD | Q-003 | Needed before schedule assessment. |
| Related team or department dependency | `context/project.yml` | missing | YYYY-MM-DD | Q-004 | Use `not_applicable` only when no cross-team input exists. |
| Completion and approval owners | `context/project.yml` | missing | YYYY-MM-DD | Q-005 | Needed before completion claims. |
| Source freshness | `context/project.yml` and `raw/` | missing | YYYY-MM-DD | Q-006 | Compare against `freshness_window_days`. |

Use `ready`, `open`, `unknown`, `not_applicable`, or `stale` as status. Do not
move the manifest to `configuration_status: ready` while a required row is
`missing`, `unknown`, or `stale`.
