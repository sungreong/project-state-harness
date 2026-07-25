# Architecture Checks From Existing Products

| Case | What it demonstrates | Design decision for this harness |
| --- | --- | --- |
| [Asana AI Teammates](https://asana.com/product/ai/ai-teammates) | Role-specific agents work from shared workflow context, memory, permissions, and checkpoints. | Give each role a narrow write boundary and share one project-state record. |
| [Notion Custom Agents](https://www.notion.com/help/custom-agents) | Autonomous runs need explicit triggers, activity logs, scoped access, and reversible work. | Keep lifecycle, run log, and handoffs inside `harness/`; make generated views reversible. |
| [Linear Agents](https://linear.app/docs/agents-in-linear) | An agent can be delegated work while the human remains primary owner. | Keep user approval for external changes and consequential decisions. |
| [Microsoft Copilot Studio multi-agent guidance](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents) | Separate agents by a clear task or data boundary; extra orchestration adds latency and governance cost. | Use five focused roles and sequential handoffs, not free-form agent debate. |

## Assessment

The existing RAW / PROCESSED / STATE / VIEWS split is suitable because it supplies the shared context needed by role-specific agents. It needed the added `harness/` layer to make question state, routing, lifecycle, and auditability explicit. The schedule role remains separate because date questions need a distinct safety policy and should not be folded into generic summarization.
