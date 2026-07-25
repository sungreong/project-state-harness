# Project State Harness Instructions

Keep this folder as the project's operating record.

- This repository represents exactly one live project. Use the template repository
  to create another project; never replace this project's records with a new one.
- A cloned template is already a valid project-state root. When
  `context/project.yml` contains `TBD` and `harness/manifest.yml` is `intake`,
  run the setup interview in this folder and update these existing files. Do not
  create a nested project-state folder or run the bootstrap script.
- Coordinate work through the focused skills in `.agents/skills/`. Use
  `project-state-harness` as the coordinator and route setup, ingest, schedule,
  checking, and brief generation to the matching focused skill.
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

## First Run in a Cloned Project

1. Ask at most three baseline questions: project outcome and time boundary, the
   first WBS milestone, and the next collaborating team or dependency.
2. Record the questions and answers in `harness/question-ledger.md`.
3. Fill `context/project.yml`, `context/operating-model.md`, and
   `views/latest-brief.md` in this repository. Mark missing information as
   `unknown` instead of inventing it.
4. Record the setup handoff, then run the strict project-state check.

## Skill Routing and Suggested Requests

| Need | Skill | Suggested request |
| --- | --- | --- |
| First baseline after clone | `project-state-setup` | "이 프로젝트 상태 관리를 시작해줘. 현재 폴더를 직접 채워줘." |
| Meeting, WBS, update, XLSX, or PPTX | `project-state-ingest` | "이 자료를 근거로 반영하고 결정, 액션, 이슈, 의존성을 추출해줘." |
| Milestone or delivery-date question | `project-state-schedule` | "이 날짜를 근거와 선행조건, 미확인 정보, 신뢰도로 평가해줘." |
| Forgotten work or blocked flow | `project-state-check` | "현재 WBS 기준으로 놓친 일과 막힌 의존성을 점검해줘." |
| Daily or weekly status | `project-state-brief` | "현재 상태를 짧은 brief와 wiki로 갱신해줘." |
