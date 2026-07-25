---
name: project-state-notify
description: Prepare, draft, or send an approved project-state digest using a project's Markdown brief and Gmail when connected. Use when a user asks for a daily status email, email draft, notification readiness check, recurring digest configuration, or delivery log for a project-state workspace.
---

# Project State Notify

Prepare a trustworthy digest from the current project state. Email delivery is
optional and off by default; a prepared draft is never a sent email.

## Workflow

1. Read `harness/notifications.yml`, `harness/requirements-status.md`,
   `views/latest-brief.md`, and `references/delivery-guardrails.md`.
2. Run `node ../project-state-harness/scripts/check-project-state.mjs --root <project-state-path> --strict`.
3. If the baseline is incomplete, stale, or the notification setting is invalid,
   update requirement status and prepare no delivery. Ask the smallest missing
   set of questions instead.
4. Generate `views/daily-email-draft.md` from the latest brief. Include current
   stage, attention items, ready work, blocked work, and open P0/P1 questions.
   Label the draft with its evidence date and whether it is provisional.
5. Record `drafted`, `sent`, `skipped`, or `blocked` in
   `harness/notification-log.md`, then add a handoff.

## Delivery Modes

- **Draft:** Default. Create or refresh the Markdown draft only.
- **Send now:** Send only when the user explicitly requests delivery in the
  current conversation and `daily_email.enabled`, recipient, timezone, send
  time, `delivery_approval: approved`, and strict baseline check all pass. Use
  the connected `gmail:gmail` skill to send. Report the recipient and subject
  without repeating sensitive body content.
- **Recurring:** Configure `harness/notifications.yml` first. Create an actual
  daily automation only when the user explicitly asks to schedule it and the
  environment provides an approved automation capability. Do not claim a
  recurring send exists merely because the YAML has `enabled: true`.

## Safety Rules

- Never infer a recipient, approval, timezone, or send time.
- Never send from a stale or incomplete project state.
- Do not use Gmail when it is not connected; leave a draft and explain the
  missing integration.
- Do not include raw meeting notes, source attachments, or confidential detail
  unless the user explicitly selects it for the digest.
- Do not change `enabled` or `delivery_approval` without explicit user approval.
