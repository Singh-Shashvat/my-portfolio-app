# `.claude/` — Claude Code configuration for FinPlan Admin

Checked in and shared by the team. It exists so Claude produces code that already matches
[CODE_REFERENCE.md](../CODE_REFERENCE.md) instead of being corrected afterwards.

`settings.local.json` is gitignored — put per-developer overrides there, not in `settings.json`.

## Layout

| Directory   | What it is                                 | How it gets used                                                                                   |
| ----------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `commands/` | Slash commands you type (`/review-branch`) | **User-invoked only.** Claude never triggers them on its own.                                        |
| `skills/`   | Task playbooks                             | **Model-invoked.** Claude matches the frontmatter `description` to the task and loads that `SKILL.md`. |
| `agents/`   | Subagents, each with its own context window | Spawned via the Agent tool, or by name ("use the qa-reviewer").                                      |
| `rules/`    | Topic-scoped coding standards               | **Read on demand**, via the index in [CLAUDE.md](../CLAUDE.md).                                      |

### Format requirements

- **Skills must be `skills/<name>/SKILL.md`** with YAML frontmatter (`name`, `description`). A loose
  `.md` file sitting directly in `skills/` is never discovered.
- **Agents must be `agents/<name>.md`** with YAML frontmatter (`name`, `description`, optionally
  `tools`, `model`). Without frontmatter the file is ignored.
- `rules/` has no built-in support in Claude Code — plain `.md` files are fine, but they are only
  reachable because CLAUDE.md indexes them.

## What's here

**Rules** — `project-context` · `code-quality-rules` · `frontend-rules` · `api-rules` ·
`state-management` · `routing-and-roles` · `ui-ux-rules` · `performance-rules`

**Skills** — `add-api-endpoint` · `add-crud-feature` · `add-module-screen` · `add-list-view` ·
`add-form` · `add-shared-component` · `optimize-performance` · `review-before-commit`
(plus the bundled `frontend-design`, `responsive-design`, `theme-factory`)

**Agents** — `admin-portal-engineer` (end-to-end feature) · `frontend-engineer` (UI in existing
modules) · `api-integration-engineer` (`src/api/` layer) · `qa-reviewer` (read-only) ·
`ui-ux-designer` · `performance-optimizer`

## The loading model

- `CLAUDE.md` loads into **every** session. Keep it a map, not an encyclopedia.
- `rules/*.md` are **not** auto-loaded. They're reachable because CLAUDE.md carries a one-line index
  saying when to open each. That's deliberate — inlining eight rule files into every session burns
  context on work that touches none of them. To force one to always load, add
  `@.claude/rules/<file>.md` to CLAUDE.md.
- Skills are selected by their `description` alone. If a skill isn't firing when it should, the
  description is too vague — put the literal phrases a developer would type into it.

## Precedence when sources disagree

1. What the user says in the conversation
2. `CODE_REFERENCE.md` (the enforced standard)
3. `.claude/rules/`
4. `CLAUDE.md`
5. Existing code in the repo

If a rule and the actual code disagree, one of them is wrong — say so rather than silently picking.

## Adding to this

- **New skill:** `skills/<kebab-name>/SKILL.md`. Write the description as "Use when
  \<literal phrases a dev would type\>".
- **New agent:** `agents/<kebab-name>.md` with a minimal `tools` list. Give read-only agents
  read-only tools — the cheapest safety guarantee available.
- **New rule:** `rules/<topic>.md`, then add a line to the rules index in `CLAUDE.md`. An unindexed
  rule is an unread rule.

Keep everything short and concrete. Prefer a pointer to real code
(`src/api/leads/useGetAllLeadsApi.ts`) over a paraphrase that will drift.

## A note on the bundled skills

`frontend-design`, `responsive-design`, and `theme-factory` shipped from a general skill library and
are also available globally in Claude Code, so the local copies are largely duplication.
`responsive-design` and `frontend-design` have been scoped to this project;
**`theme-factory` (slide/document theming) has no use in this repo** and can be deleted — it's kept
only because removing it is your call.
