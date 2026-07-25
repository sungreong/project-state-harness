# Project State Harness Instructions

Keep this folder as the project's operating record.

- Preserve `raw/` as evidence. Do not rewrite or silently delete evidence.
- Use `harness/manifest.yml` to make the lifecycle and active focus explicit.
- Record each user question in `harness/question-ledger.md` before asking it; do not ask more than three questions at once.
- Run only one state-changing role at a time and record its result in `harness/handoffs.md`.
- Extract confirmed facts into `processed/` with source links.
- Put inference, uncertainty, and risk in `state/`; label them `actual`, `planned`, `blocked`, `unknown`, or `assumed`.
- Regenerate `views/` after changing processed facts or state.
- Do not alter calendars, trackers, owners, or source files without explicit approval.
- Treat `context/operating-model.md` as the company- or project-specific definition of done and approval flow.
- Keep `views/latest-brief.md` concise: current stage, attention items, ready work, and source links.
