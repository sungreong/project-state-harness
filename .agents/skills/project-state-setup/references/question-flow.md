# Setup Question Flow

## Cloned Template Scenario

The cloned repository is not empty. It already contains the project-state
schema, `AGENTS.md`, focused skills, empty evidence tables, and `TBD` baseline
values. Treat its root as the active project state. Fill it in place after the
first-round answers; do not create another project-state folder below it.

## First Round: Establish a Working Baseline

Ask only these three questions unless the user already supplied the answer:

1. What outcome does this project need to deliver, and by when?
2. What WBS stages, milestone list, or immediate next milestone already exists?
3. Which people or teams must provide something before the next stage can finish?

## Second Round: Establish the Local Operating Model

Ask only the questions that affect the project now:

| Gap | Question |
| --- | --- |
| No completion rule | What evidence makes this WBS stage actually done? |
| Approval unclear | Who can approve scope, technical, or release changes? |
| Dependency vague | What must arrive, from whom, and by when? |
| Owner unclear | Who will answer when this item stops moving? |
| Freshness unclear | How long can an update remain unconfirmed before it becomes attention-worthy? |

## Scenario: User Knows Only the Goal

Create a single provisional WBS stage, write missing WBS detail as `unknown`, and ask for the next observable milestone instead of inventing a full plan.

## Scenario: User Has a Detailed WBS but No Team Context

Import the WBS, ask for the team or person responsible for only the next phase, and leave later owners as `unknown`.

## Scenario: User Has Company-Specific Process Rules

Write the rules in `context/operating-model.md`. Separate mandated gates from preferences, and link each gate to the WBS phase it affects.
