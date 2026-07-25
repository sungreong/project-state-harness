# Project State Schema

## Folder Contract

```text
project-state/
  AGENTS.md
  context/       # Project-specific operating rules and WBS baseline
  harness/       # Lifecycle, open questions, and role handoffs
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

## Update Order

1. `context/` only when the user changes the baseline or operating model.
2. `harness/` to record lifecycle, questions, and role handoff.
3. `raw/` for a new source.
4. `processed/` for confirmed extraction.
5. `state/` for assessed implications.
6. `views/` for readable summaries.
