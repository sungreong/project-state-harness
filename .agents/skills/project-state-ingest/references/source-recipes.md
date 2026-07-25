# Source Recipes

| Source | Raw evidence note | Extract | Do not infer |
| --- | --- | --- | --- |
| Meeting note | attendees, date, source ID, exact decisions/actions | decision, action, issue, dependency | completion without evidence |
| Team update | team, update date, stated status | actual progress, blocker, requested input | due date when none was stated |
| Markdown WBS | file path and heading anchors | planned stage, target date, exit criteria | actual progress |
| XLSX | path, sheet, range/table, as-of date | dates, owners, numeric status, formulas as displayed | semantics of an unlabeled column |
| PPTX | path and slide number | stated target, decision, reported risk | confirmation that the slide is current |

## Scenario: Meeting Introduces an Unowned Action

Create an action with owner `unknown`, put a focused ownership question in `state/open-questions.md`, and flag it for `project-state-check`.

## Scenario: Spreadsheet Date Conflicts with a Meeting Date

Record both facts with their sources. Do not choose one silently; create an open question naming the conflict and the person who can resolve it.

## Scenario: Slide Says Green but Issues Are Blocked

Keep the slide's reported status as evidence, record the blocked issues separately, and add a risk explaining the contradiction.
