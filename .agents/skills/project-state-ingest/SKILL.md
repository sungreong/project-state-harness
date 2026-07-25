---
name: project-state-ingest
description: Convert project evidence into traceable Markdown state updates. Use when a user provides meeting notes, team updates, WBS documents, Markdown, XLSX, CSV, or PPTX and wants decisions, actions, issues, dependencies, or schedule changes reflected in a project-state workspace.
---

# Project State Ingest

Turn incoming material into evidence and facts, not unsupported project conclusions.

## Workflow

1. Read the core schema at `../project-state-harness/references/schema.md` and `references/source-recipes.md`.
2. Preserve the source and create one evidence note under the appropriate `raw/` folder.
3. Extract explicit facts into `processed/`: facts, actions, decisions, issues, and dependencies. Link every extracted row to the evidence source ID.
4. When a source changes a plan, keep the old plan as planned baseline and record the new statement as actual evidence; do not erase the difference.
5. Send uncertain, conflicting, or incomplete items to `state/open-questions.md` or `state/risks.md`. When a source changes another team's commitment, also update the corresponding file under `teams/` and `teams/index.md`.
6. Add an ingest handoff with source IDs, changed files, and open question IDs. Finish by running the core structural check. Do not regenerate the brief; hand off to `project-state-check` then `project-state-brief`.

## Source Boundaries

- Use `spreadsheets:Spreadsheets` read-only for workbooks unless the user requests a workbook edit.
- Use `presentations:Presentations` for PPTX inspection and cite slide numbers.
- Treat a deck's target date as a stated target, not proof that work is complete.
- Keep source metadata complete even when the source is a pasted chat message.
