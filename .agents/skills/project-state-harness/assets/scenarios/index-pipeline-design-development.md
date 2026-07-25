# Scenario: Index Pipeline Design and Development

This is an example for testing the generic harness. Do not copy it into a real project unchanged.

## User starts with

> I need to design and develop an index pipeline. The target date is six weeks from now, but I do not yet know the source systems, data volume, or deployment owner.

## Setup questions

1. What decision or usable outcome must exist at the six-week date: architecture approval, a working pipeline, validated data, or production release?
2. What WBS or next milestone already exists?
3. Which team owns source-data access, infrastructure, and release approval?

## Expected initial state

- Lifecycle: `awaiting-user` after the three answers are requested.
- The date is a target, not a committed release date.
- Data access, acceptance criteria, and deployment ownership are `unknown`.

## After a meeting says "start implementation next Monday"

- Ingest the statement as evidence, then create an action for the implementation start only if an owner and source ID exist.
- The schedule role must warn that implementation start does not prove readiness. It checks source access, schema contract, acceptance criteria, environments, and reviewer availability.
- The check role opens P0 questions if any of those inputs block the next WBS transition.

## Example schedule answer shape

> The six-week date is currently a target with low confidence. Architecture approval, source-data access, data contract, test dataset, and release owner are not evidenced. Treat the next date as a discovery/design milestone until those questions are resolved.
