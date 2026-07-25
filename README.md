# Project State Harness

WBS, 회의록, 팀 업데이트, 이슈, 의존성과 일정 판단을 Markdown으로 관리하는
개인용 프로젝트 운영 하네스입니다. **프로젝트 하나당 Git 저장소 하나**를
사용합니다.

이 저장소는 실제 프로젝트 기록을 담는 곳이 아니라, 새 프로젝트를 시작할 때
쓰는 깨끗한 템플릿입니다.

## 운영 방식

```text
project-state-harness (이 템플릿)
  ├─ search-index-pipeline-state (실제 프로젝트 A)
  ├─ partner-launch-state         (실제 프로젝트 B)
  └─ ...
```

각 프로젝트는 별도 저장소와 별도 이력을 가집니다. 따라서 A 프로젝트의 회의록,
일정 판단, 미확인 항목이 B 프로젝트와 섞이지 않습니다.

## 새 프로젝트 시작하기

### 권장: GitHub Template 사용

1. 이 저장소를 GitHub의 **Template repository**로 지정합니다.
2. GitHub에서 **Use this template**을 선택해 새 프로젝트 저장소를 만듭니다.
   예: `search-index-pipeline-state`
3. 새로 만들어진 저장소를 clone합니다. 템플릿 저장소 자체를 clone해 기록을
   추가하지 않습니다.

```powershell
git clone <새-프로젝트-저장소-URL>
cd <새-프로젝트-폴더>
```

### GitHub Template을 쓰지 않는 경우

템플릿을 새 폴더로 clone한 뒤, 프로젝트 전용 원격 저장소를 연결합니다. 실제
프로젝트 데이터를 쓰기 전에 반드시 새 원격으로 바꿉니다.

```powershell
git clone https://github.com/sungreong/project-state-harness.git my-project-state
cd my-project-state
git remote remove origin
git remote add origin <새-프로젝트-저장소-URL>
git push -u origin main
```

## Clone 후 첫 대화

새 프로젝트 폴더를 Codex로 열고 아래처럼 요청합니다.

```text
이 프로젝트 상태 관리를 시작해줘.
프로젝트 목표, 현재 기한, 첫 WBS 마일스톤을 질문으로 채워줘.
모르는 정보는 unknown으로 남기고, 질문 이력에도 기록해줘.
```

`project-state-setup` 스킬이 한 번에 최대 세 가지 질문을 하고, 답을 다음 파일에
기록합니다.

- `context/project.yml`: 프로젝트 목표와 WBS 기준선
- `context/operating-model.md`: 완료 기준, 승인 흐름, 팀별 운영 규칙
- `harness/question-ledger.md`: 아직 답하지 못한 질문
- `views/latest-brief.md`: 지금 읽을 현황 요약

## 평소 사용하는 요청

회의나 팀 업데이트가 생겼을 때:

```text
이 회의록을 반영해줘. 원문 근거와 출처를 raw에 남기고,
결정, 액션, 이슈, 의존성만 processed에 추출해줘.
```

놓친 일을 확인할 때:

```text
현재 WBS와 최근 업데이트를 기준으로 내가 놓친 일, 막힌 의존성,
개발 착수 전에 확인할 항목을 정리해줘.
```

일정을 판단할 때:

```text
9월 30일 배포 목표를 평가해줘. 가능/불가능으로 단정하지 말고,
근거 시점, 선행조건, 빠진 정보, 신뢰도, 다음 질문을 남겨줘.
```

일정 스킬은 종료 기준, 의존 팀, 테스트, 리뷰, 릴리스 책임자가 비어 있으면
확정 답변 대신 조건부 목표와 확인 질문을 남깁니다.

## Git에 넣는 것과 넣지 않는 것

Git에는 판단과 근거를 재현할 수 있는 Markdown 기록을 넣습니다.

- 포함: `context/`, `harness/`, `processed/`, `state/`, `views/`, `raw/`의
  Markdown 근거 노트, `AGENTS.md`, `.agents/skills/`
- 기본 제외: XLSX, PPTX, PDF, 녹취, 영상, Office 임시 파일, `.env`,
  `raw/private/`, `raw/originals/`

원본 XLSX/PPTX/PDF는 회사에서 승인한 저장소에 보관하고, `raw/`에는
`source_ref`, 캡처 날짜, 시트/범위 또는 슬라이드 번호를 가진 Markdown 근거
노트를 남깁니다. 저장소는 기본적으로 private로 운영합니다.

## 폴더 구조

```text
context/     프로젝트 기준선, WBS, 완료 및 승인 규칙
harness/     라이프사이클, 질문 이력, 역할 handoff, 실행 로그
raw/         추가만 하는 Markdown 근거 노트와 원본 참조
processed/   근거에서 확인된 사실, 액션, 결정, 이슈, 의존성
state/       위험, 불확실성, 개발 준비도, 일정 평가
views/       매일 보는 brief와 wiki
.agents/     이 저장소를 관리하는 Codex 스킬
```

## 커밋 전 확인

```powershell
node .agents/skills/project-state-harness/scripts/check-project-state.mjs --root . --strict
git status
git add AGENTS.md context harness raw processed state views .agents README.md .gitignore .gitattributes
git commit -m "docs: update project state"
git push
```

회의 반영, WBS 기준선 갱신, 일정 평가, 주간 brief 갱신처럼 하나의 의미 있는
단위로 커밋을 남기면, 나중에 판단 근거와 상태 변화를 되짚기 쉽습니다.
