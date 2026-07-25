# Delivery Guardrails

## Required Before an Automated Daily Digest

All of the following must be true:

1. `harness/manifest.yml` has `configuration_status: ready`.
2. The strict project-state check passes with no stale freshness warning.
3. `harness/notifications.yml` has `daily_email.enabled: true`.
4. Recipient, timezone, and `HH:MM` send time are concrete values.
5. `delivery_approval: approved` is recorded after the user approves the
   recipient and cadence.
6. The user has explicitly asked to create the recurring automation in an
   environment that can create it.

## Draft Content

Use the latest brief as the source. State the evidence or status-as-of date,
open P0/P1 questions, and any provisional label. Keep the draft short enough
to scan; link source IDs rather than copying raw meeting notes.

## Delivery Log

Record timestamp, mode, recipient, source brief date, result, and approval or
automation evidence. Do not store email body text or credentials in the log.
