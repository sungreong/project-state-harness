# Project State Harness

One Git repository for one project's operating record. Use this repository as a
template: create a separate repository for each real project, then let Codex
maintain its WBS context, meeting evidence, actions, dependencies, risks, and
schedule assessments in Markdown.

## Repository model

- Keep this repository clean and generic. It is the template, not a live project.
- Create one independent repository per project from this template.
- Clone that new project repository locally and work inside it with Codex.
- Do not push project-specific records back to the template repository.

The project repository contains both the operating record and the focused Codex
skills under `.agents/skills/`. Opening the cloned repository in Codex makes the
project instructions and skills available together.

## Start a project

### Recommended: use this as a Git hosting template

1. Publish this repository as a private template repository.
2. Use your Git host's **Use this template** action to create a new repository,
   such as `search-index-pipeline-state`.
3. Clone the newly created repository, not the template repository.

```powershell
git clone <new-project-repository-url>
cd <new-project-repository-folder>
```

### Local alternative

Clone the template into a new folder, then assign it a new remote before adding
project material. This prevents one project's history from becoming another
project's starting state.

```powershell
git clone <template-repository-url> my-new-project-state
cd my-new-project-state
git remote remove origin
git remote add origin <new-project-repository-url>
git push -u origin main
```

## First Codex conversation

Open the cloned project repository in Codex and say:

```text
이 프로젝트 상태 관리를 시작해줘.
프로젝트 목표, 현재 기한, 첫 WBS 마일스톤을 질문으로 채워줘.
모르는 정보는 unknown으로 남기고, 질문 이력에도 기록해줘.
```

Codex uses `project-state-setup` and asks at most three questions at once. Its
answers populate `context/project.yml`, `context/operating-model.md`,
`harness/question-ledger.md`, and the first project brief.

## Daily use

Add a source or ask Codex to record it. Keep the original source outside this
repository unless it is explicitly approved for Git.

```text
이 회의록을 반영해줘. 원문 근거와 출처를 raw에 남기고,
결정, 액션, 이슈, 의존성만 processed에 추출해줘.
```

```text
현재 WBS와 최근 업데이트를 기준으로 내가 놓친 일, 막힌 의존성,
개발 착수 전에 확인할 항목을 정리해줘.
```

```text
9월 30일 배포 목표를 평가해줘. 가능/불가능으로 단정하지 말고,
근거 시점, 선행조건, 빠진 정보, 신뢰도, 다음 질문을 남겨줘.
```

Use `views/latest-brief.md` as the short daily view, and
`harness/question-ledger.md` as the durable list of unanswered questions.

## What Git tracks

Track the Markdown operating record:

- `context/`, `harness/`, `processed/`, `state/`, and `views/`
- Markdown evidence notes in `raw/`
- `AGENTS.md` and the bundled `.agents/skills/`

The included `.gitignore` excludes common source binaries and private source
folders. For an XLSX, PPTX, PDF, recording, or confidential original, preserve
an auditable Markdown note in `raw/` with `source_ref`, sheet/range or slide
reference, and capture date. Store the original in an approved location.

Use a private repository by default. A private Git repository does not override
your organization's information-handling policy.

## Verify before commit

```powershell
node .agents/skills/project-state-harness/scripts/check-project-state.mjs --root . --strict
git status
git add AGENTS.md context harness raw processed state views .agents README.md .gitignore
git commit -m "docs: update project state"
```

Each commit should describe a coherent update, such as a WBS baseline, a meeting
ingest, a schedule assessment, or a weekly brief refresh.

## Folder map

```text
context/     Project baseline, WBS, completion and approval rules
harness/     Lifecycle, question ledger, role handoffs, and run log
raw/         Append-only Markdown evidence notes and source references
processed/   Confirmed facts, actions, decisions, issues, dependencies
state/       Risks, uncertainty, readiness, and schedule assessment
views/       Regenerated daily brief and wiki view
.agents/     Focused Codex skills used to maintain this repository
```
