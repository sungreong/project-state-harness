---
name: project-state-harness
description: Maintain a personal project's live state from WBS, meeting notes, team updates, Markdown, XLSX, and PPTX sources. Use when Codex needs to initialize or update a lightweight project-state folder, identify missed actions, blockers, missing context, dependencies, or development readiness, and regenerate Markdown briefs and wiki views.
---

# Project State Harness

Maintain a personal project operating record. Treat Markdown as the durable, human-readable system of record; treat source files as evidence. Act as the coordinator for the focused project-state skills, not as an unrestricted group chat among agents.

## Use This Workflow

1. Locate the project-state root. A cloned template root already contains the
   project-state files and must be initialized in place through
   `project-state-setup`. Only when the user explicitly wants a new folder in a
   blank parent should setup create a copy from `assets/project-state-template/`.
2. Preserve the source in `raw/`; never overwrite user-provided `.xlsx`, `.pptx`, or source Markdown.
3. Convert each source into an auditable Markdown evidence note under `raw/imports/`, `raw/meetings/`, or `raw/updates/`. Keep source ID, source path, captured time, and a precise sheet/range or slide reference.
4. Update only confirmed facts in `processed/`. Put uncertain interpretation in `state/` and link it to its evidence.
5. Read `harness/manifest.yml`, `harness/requirements-status.md`, and run
   `node scripts/check-project-state.mjs --root <project-state-path>` before
   routing. If required configuration is incomplete or stale, record the gap,
   route setup or check, and ask at most three questions before continuing.
6. Route one focused task: setup, ingest, schedule, check, brief, or notify.
   Run roles sequentially when they touch the same state.
7. Require each role to record its input, changed files, open questions, and next role in `harness/handoffs.md`.
8. Reconcile WBS, milestones, issues, decisions, and dependencies. Update `state/` before regenerating `views/`.
9. Update requirement status and `last_preflight`, then run
   `node scripts/check-project-state.mjs --root <project-state-path> --strict`
   before handing off whenever lifecycle is beyond `intake`.

Read `references/schema.md` before creating or changing project-state files. Read `references/checks.md` before assessing missed work, risk, or readiness.

## Routing

| User need | Invoke | Primary writes |
| --- | --- | --- |
| Starting with partial information | `project-state-setup` | `context/`, `harness/question-ledger.md` |
| Adding a meeting, update, Markdown, XLSX, or PPTX | `project-state-ingest` | `raw/`, `processed/` |
| Asking about a date, sequence, or whether a deadline is safe | `project-state-schedule` | `state/schedule-assessment.md` |
| Asking what is missing, blocked, or forgotten | `project-state-check` | `state/`, `harness/question-ledger.md` |
| Asking for a current summary or wiki | `project-state-brief` | `views/` |
| Preparing or sending an approved status email | `project-state-notify` | `views/daily-email-draft.md`, notification log |

## Cloned Template First Run

When the current repository has `context/project.yml` values such as
`{{project_name}}` and an `intake` manifest, treat it as a fresh project, not
an empty workspace. The template already supplies the schema, the raw note
formats, the state files, and the focused skills. Ask the setup questions, then
replace the configuration variables in `AGENTS.md` and write the answers into
the current repository. Do not create `project-state/` below the cloned root.

Read `references/harness-protocol.md` before coordinating multiple roles. Read `references/case-comparison.md` when changing the architecture or adding another role.

## Coordination Rules

- The coordinator is the only role that asks the user questions during a multi-role run. It asks at most three, records them in the question ledger, and resumes after answers arrive.
- Do not let one role overwrite another role's conclusion. Pass source IDs, state labels, and unresolved question IDs through a handoff instead.
- A role may recommend a calendar, tracker, owner, or schedule change. Only the user may approve an external change.
- Keep the lifecycle explicit: `intake`, `baseline`, `evidence`, `reconcile`, `awaiting-user`, or `monitoring`.
- Treat `configuration_status: ready` as a gate, not a label. Do not mark it
  ready while required configuration is missing, `unknown`, stale, or still a
  template variable.
- Check requirement status at every conversation entry, source update, schedule
  assessment, brief regeneration, and notification run. Preserve unanswered
  questions until evidence resolves them.
- Do not send email by default. `harness/notifications.yml` may enable delivery
  only after baseline readiness, recipient, timezone, send time, and explicit
  delivery approval are present.

## Source Intake

### Markdown

Copy or link the user-provided note into `raw/`. Add frontmatter with `source_id`, `source_type`, `source_ref`, and `captured_at`. Extract only explicit facts into `processed/`.

### XLSX, XLS, CSV, TSV

Use the `spreadsheets:Spreadsheets` skill in read-only mode to inspect relevant sheets, tables, formulas, and displayed values. Do not alter the source workbook unless the user separately asks for a workbook edit. Write an evidence note that includes the workbook path, sheet name, range/table name, as-of date, and the rows or figures used.

### PPTX or Google Slides

Use the `presentations:Presentations` skill to inspect the deck or relevant slides. Preserve the source deck. Write an evidence note with deck path, slide number, visible claim/decision, and any caveat that depends on speaker notes or visuals.

## State Rules

- Keep `raw/` append-only except for user-authorized corrections.
- Keep `processed/` factual: state the source and avoid unsupported completion claims.
- Put assumptions, risk assessments, stale signals, and unanswered questions in `state/`.
- Generate `views/` from the other layers. Never let a wiki summary be the only record of a decision.
- Use `planned`, `actual`, `blocked`, `unknown`, and `assumed` explicitly. Do not silently turn `unknown` into `done`.
- Propose external changes such as calendar edits, owner changes, or tracker updates; require the user's approval before applying them.

## Minimum Update Loop

For a meeting or status update:

1. Add the raw evidence note.
2. Extract decisions, actions, issues, dependencies, and facts.
3. Compare the evidence against the WBS stage exit criteria.
4. Update open questions, risks, and development readiness.
5. Rewrite `views/latest-brief.md` with current stage, three attention items, ready work, and evidence links.

## Resources

- `references/schema.md`: folder contract and Markdown schemas.
- `references/checks.md`: deterministic and judgment-based checks.
- `references/harness-protocol.md`: lifecycle, handoff, and role contracts.
- `references/case-comparison.md`: case-derived architecture decisions.
- `scripts/check-project-state.mjs`: structural preflight check.
- `scripts/check-schedule-assessment.mjs`: schedule-answer safety check.
- `harness/requirements-status.md`: visible baseline and freshness gate.
- `harness/notifications.yml`: opt-in daily email eligibility settings.
- `scripts/bootstrap-project-state.mjs`: safe template bootstrapper for an
  explicitly requested new folder, not for a cloned template root.
- `assets/project-state-template/`: copyable personal project-state starter.
