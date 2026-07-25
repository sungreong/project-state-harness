# Project State Schema

## Folder Contract

```text
project-state/
  AGENTS.md
  context/       # Project-specific operating rules and WBS baseline
  harness/       # Lifecycle, requirements, notifications, questions, handoffs
  teams/         # One Markdown context file per collaborating team
  raw/           # Immutable source evidence and source register
  processed/     # Confirmed structured facts extracted from evidence
  state/         # Agent judgment, uncertainty, risk, and readiness
  views/         # Regenerated personal briefs and wiki summaries
```

## Evidence Frontmatter

Every non-template Markdown source in `raw/` must start with:

```yaml
---
source_id: SRC-YYYYMMDD-001
source_type: meeting-note | status-update | markdown | xlsx | pptx | calendar
source_ref: relative path, URL, or human description
captured_at: YYYY-MM-DD
---
```

For XLSX, add `sheet:` and `range:`. For PPTX, add `slides:`. Preserve the original file path under `source_ref`.

## Required Project Baseline

`context/project.yml` is the structured source of truth for the project
baseline. Initial setup must fill, or explicitly mark as `unknown` or
`not_applicable`, each of these:

- `project_name`, `project_owner`, `project_goal`, and `status_as_of`.
- Current WBS phase and the first WBS item's owner, target date, and exit criteria.
- Representative schedule type (`external_commitment` or `internal_target`), date, and next milestone.
- At least one related team or department with contact, expected deliverable, needed-by date, and status.
- Definition of done, approval owner, and release owner when release applies.

Replace the matching configuration variables in the root `AGENTS.md` at the
same time. `intake` may contain template variables; any later lifecycle must
not.

Do not treat a schedule as a commitment when its type or date is `unknown`.

## Processed Records

Use Markdown tables. Every extracted record needs an ID, date, status, and evidence link.

| Record | Required fields |
| --- | --- |
| Fact | ID, date, statement, source, confidence |
| Action | ID, action, owner, due, status, source |
| Decision | ID, decision, decision maker, date, source |
| Issue | ID, description, owner, status, impact, source |
| Dependency | ID, predecessor, successor, owner, status, source |

## State Labels

Use these labels exactly where applicable:

- `planned`: present in WBS but not evidenced as actual.
- `actual`: supported by a dated source.
- `blocked`: cannot move without a dependency, decision, or external response.
- `unknown`: needed information is missing.
- `assumed`: temporary interpretation that needs confirmation.

## Harness Records

`harness/manifest.yml` is the small machine-readable control record. It holds the lifecycle, active focus, freshness window, and last completed role; it does not replace Markdown state.

`harness/question-ledger.md` is the durable record of user questions.

| ID | Priority | Area | Question | Status | Answer / Evidence | Next role |
| --- | --- | --- | --- | --- | --- | --- |

Use `P0` only when the answer blocks a near-term decision or WBS transition. Use `open`, `asked`, `answered`, `waived`, or `obsolete` as question status.

`harness/handoffs.md` logs one row per role run.

| Run | Role | Input source IDs | Changed files | Open question IDs | Next role | Result |
| --- | --- | --- | --- | --- | --- | --- |

`harness/run-log.md` is append-only. Record trigger, time, selected role, and whether the run stopped for a user answer.

`harness/requirements-status.md` is the visible baseline and freshness gate.
Update it at the start and end of every state-changing conversation.

`harness/notifications.yml` holds optional daily email eligibility. It is not a
recurring job definition: a separate, explicitly approved automation is needed
to schedule delivery.

## Team Context

`teams/index.md` is the visible cross-team directory. Each collaborating team
gets a file at `teams/<stable-team-slug>.md` that records a contact, interface
or deliverable, needed-by date, update cadence, status, and open questions.
Keep the same dependency ID in the team file and `processed/dependencies.md`.

## Update Order

1. `context/` only when the user changes the baseline or operating model.
2. `harness/` to record lifecycle, questions, and role handoff.
3. `raw/` for a new source.
4. `processed/` for confirmed extraction.
5. `state/` for assessed implications.
6. `views/` for readable summaries.
