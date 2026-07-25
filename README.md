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

clone한 폴더는 비어 있지 않습니다. 이미 아래의 프로젝트 운영 골격과 Codex
스킬이 들어 있습니다. 다만 프로젝트 이름, WBS, 팀, 일정 같은 실제 값만
`{{project_name}}` 같은 템플릿 변수 또는 빈 표로 남아 있습니다. 첫 대화에서
모든 필수 변수는 값, `unknown`, 또는 `not_applicable` 중 하나로 바뀝니다.

```text
AGENTS.md, context/, harness/, raw/, processed/, state/, views/
.agents/skills/ (setup, team context, ingest, schedule, check, brief)
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

이 명령도 템플릿 파일 전체를 `my-project-state`로 복제합니다. 이후 Codex는
새 폴더를 만들지 않고, 현재 clone한 루트 안의 파일을 채웁니다.

## Clone 후 첫 대화

새 프로젝트 폴더를 Codex로 열고 아래처럼 요청합니다. `AGENTS.md`가 현재
루트를 프로젝트 상태 폴더로 인식하므로 별도 설치나 폴더 생성은 필요 없습니다.

```text
이 프로젝트 상태 관리를 시작해줘.
프로젝트 목표, 현재 기한, 첫 WBS 마일스톤을 질문으로 채워줘.
모르는 정보는 unknown으로 남기고, 질문 이력에도 기록해줘.
```

`project-state-setup` 스킬이 한 번에 최대 세 가지 질문을 하고, 현재 clone한
루트의 다음 파일을 직접 갱신합니다.

- `context/project.yml`: 프로젝트 목표와 WBS 기준선
- `context/operating-model.md`: 완료 기준, 승인 흐름, 팀별 운영 규칙
- `harness/question-ledger.md`: 아직 답하지 못한 질문
- `views/latest-brief.md`: 지금 읽을 현황 요약
- `teams/index.md`: 협업 부서와 의존성을 한 번에 보는 팀 컨텍스트 목록

초기 Q&A의 필수 설정값은 `AGENTS.md`의 **Project Configuration Template**에
보입니다. 프로젝트 대표 일정의 성격과 날짜, 현재 WBS 단계와 종료 기준,
협업 부서의 담당자·제공물·필요 시점, 완료·승인 책임자를 포함합니다.

## 협업 부서 정보

`teams/`는 회의록과 달리 **현재의 팀 인터페이스**를 바로 읽는 공간입니다.
`teams/index.md`에는 모든 협업 부서를, `teams/<team>.md`에는 각 부서의
담당자, 제공물, 필요 시점, 업데이트 주기, 의사결정, 위험, 열린 질문을 둡니다.

```text
이 프로젝트의 협업 팀을 하나씩 질문해서 정리해줘.
teams 폴더에 팀별 문서를 만들고 의존성과 연결해줘.
```

`project-state-team-context` 스킬이 한 번에 세 가지 이하의 질문으로 팀
정보를 채웁니다. 새 회의록에서 팀 약속이 바뀌면 ingest 스킬이 해당 팀 문서와
의존성 기록을 함께 갱신합니다.

## 계속 점검되는 필수값

하네스는 첫 설정에서만 질문하지 않습니다. 대화를 시작하거나 회의록, WBS,
일정, brief를 갱신할 때마다 `harness/requirements-status.md`와 프로젝트
신선도를 점검합니다.

- 필수값이 `{{...}}`, `unknown`, 또는 오래된 정보이면 질문 이력에 남기고
  가장 영향이 큰 세 가지 질문만 다시 묻습니다.
- 기준선이 준비되지 않으면 일정은 조건부 평가로만 남고, brief는
  `provisional`로 표시합니다.
- `status_as_of`, `last_updated`, `freshness_window_days`로 현재 상태가
  오래됐는지 확인합니다.
- 기준선이 완료되면 `configuration_status: ready`와 엄격 검증 통과가 필요합니다.

## 선택 기능: Gmail 일일 요약

기본값은 **미발송**입니다. `project-state-notify`는 먼저
`views/daily-email-draft.md`에 초안만 만듭니다.

실제 발송 또는 반복 발송을 켜려면 다음 값을 모두 채워야 합니다.

1. 필수 프로젝트 기준선이 준비되어 엄격 검증을 통과해야 합니다.
2. `harness/notifications.yml`에서 `enabled: true`로 설정합니다.
3. 수신자 이메일, 시간대, `HH:MM` 발송 시각을 채웁니다.
4. 사용자가 수신자와 주기를 확인한 뒤 `delivery_approval: approved`로
   명시적으로 승인합니다.
5. 실제 반복 자동화는 사용자가 “매일 발송 자동화를 만들어줘”라고 별도로
   요청하고, 해당 환경에 승인된 자동화 기능이 있을 때만 생성합니다.

```text
오늘의 프로젝트 요약 메일 초안을 만들고 발송 조건을 점검해줘.
```

```text
수신자와 발송 시각을 확인했어. Gmail로 오늘 메일을 발송해줘.
```

두 번째 요청은 즉시 발송 요청입니다. 자동 반복 발송 설정과는 별개입니다.

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
teams/       협업 부서별 담당자, 제공물, 의존성, 업데이트 주기, 열린 질문
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
