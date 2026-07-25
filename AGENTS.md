# Project State Harness Instructions

Keep this folder as the project's operating record.

## Project Configuration Template

During the first setup, replace every `{{...}}` value below with a confirmed
value or `unknown`. Keep the same values in `context/project.yml`, which is the
structured source of truth for schedule and dependency assessments.

| Required setting | Template value | Why it matters |
| --- | --- | --- |
| Representative project | `{{project_name}}` | Separates this project from other cloned repositories. |
| Project owner | `{{project_owner}}` | Names the person who resolves stalled work. |
| Intended outcome | `{{project_goal}}` | Prevents activity from being mistaken for completion. |
| Status as of | `{{status_as_of_yyyy-mm-dd}}` | Makes stale updates visible. |
| Current WBS phase | `{{current_wbs_phase}}` | Anchors the current state to one stage. |
| Representative schedule type | `{{external_commitment_or_internal_target}}` | Distinguishes a promise from a planning target. |
| Representative schedule date | `{{representative_schedule_date}}` | Gives schedule assessment a concrete date. |
| Next milestone and exit criteria | `{{next_milestone_name}}` / `{{next_milestone_exit_criteria}}` | Defines what must be true before work can advance. |
| Related team or department | `{{related_team_name}}` | Surfaces cross-team work early. |
| Team contact and expected deliverable | `{{team_contact}}` / `{{team_deliverable}}` | Makes dependencies actionable. |
| Needed-by date | `{{dependency_needed_by_date}}` | Connects a dependency to the schedule. |
| Completion and approval owners | `{{definition_of_done}}` / `{{approval_owner}}` | Prevents false completion and unclear decisions. |
| Daily email enabled (optional) | `{{daily_email_enabled_true_or_false}}` | Keeps delivery opt-in. |
| Daily email recipient and time | `{{daily_email_recipient}}` / `{{daily_email_send_time_hh-mm}}` | Makes an approved recurring digest deliverable. |

Never leave a placeholder silently. Replace it with a known value, `unknown`,
or `not_applicable`, then create an open question when the answer affects a
near-term milestone, dependency, or schedule assessment.

## Continuous Harness Guard

At the start of every user request and after every state-changing update:

1. Run `node .agents/skills/project-state-harness/scripts/check-project-state.mjs --root .`.
2. Update `harness/requirements-status.md` with the missing value, status, last
   check date, and linked question ID.
3. If a required baseline value is missing, `unknown`, stale, or still a
   `{{...}}` variable, create or retain an open question and ask at most three
   highest-impact questions. Keep lifecycle `intake` or `awaiting-user`.
4. Do not mark a WBS phase ready, treat a schedule as a commitment, or send an
   automated email while baseline requirements are incomplete.
5. After the required values and current update evidence are present, update
   `harness/manifest.yml` to `configuration_status: ready`, run the strict
   check, then continue with ingest, schedule, check, brief, or notification.

Use `status_as_of`, `last_updated`, and `freshness_window_days` to detect stale
updates. A stale state is not a current status: record the freshness question
before relying on it.

- This repository represents exactly one live project. Use the template repository
  to create another project; never replace this project's records with a new one.
- A cloned template is already a valid project-state root. When
  `context/project.yml` contains `{{project_name}}` and
  `harness/manifest.yml` is `intake`, run the setup interview in this folder
  and update these existing files. Do not create a nested project-state folder
  or run the bootstrap script.
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

1. Ask at most three baseline questions: project name and owner, intended
   outcome and representative schedule, then current WBS milestone and the next
   collaborating team or dependency.
2. Record the questions and answers in `harness/question-ledger.md`.
3. Replace the configuration variables in this file, then fill
   `context/project.yml`, `context/operating-model.md`, and
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
| Approved daily email or draft | `project-state-notify` | "오늘의 프로젝트 요약 메일 초안을 만들고, 발송 조건을 점검해줘." |
