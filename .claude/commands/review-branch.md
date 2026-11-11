---
description: Pre-push deep code review. Delegates to the code-review engine, scoped to the whole branch vs origin/dev INCLUDING uncommitted changes, using REVIEW.md as the rubric. Also audits consistency with existing codebase patterns, structure, and folder layout. Use before pushing.
disable-model-invocation: true
argument-hint: "[effort: low|medium|high|max — default high]"
---

Run a full code review of the current branch by delegating to the **code-review** skill, with the
scope and rubric below.

## Scope — override the code-review default

Review the changes produced by this exact command:

`git diff --merge-base origin/dev`

That is the whole branch since it forked from `origin/dev`, **including uncommitted working-tree
changes**. Do NOT let the code-review skill fall back to its default `@{upstream}...HEAD` scope —
that compares against the already-pushed branch and silently drops uncommitted edits, which is the
exact problem this command exists to avoid.

## How to run

Invoke the `code-review` skill (via the Skill tool) at effort **$ARGUMENTS** — if no effort was
passed, default to `high`. Hand it this instruction verbatim as its target:

> Review the diff from `git diff --merge-base origin/dev` (this branch vs origin/dev, including
> uncommitted working-tree changes). Apply the severity levels, "never flag" rules, output format,
> and closing summary block defined in REVIEW.md exactly — do not use a different format.
>
> This review has two passes. **Pass 1 — correctness:** the 🔴/🟡 rules in REVIEW.md. **Pass 2 —
> consistency:** does this change look like it was written by the same team as the rest of the
> repo? Check folder placement, file naming, module/API layout, barrel exports, hook signatures,
> component file structure, and reuse of existing `Custom*` components and utils. Follow the
> "Consistency Baseline" section of REVIEW.md — you MUST open the named sibling files and compare
> against real code before raising any 🔵 finding, and cite the file you compared against. Do not
> infer conventions from the diff alone; the diff cannot show you what the codebase already does.

Also flag any new untracked files as part of the review:

`git ls-files --others --exclude-standard`

Untracked files matter most for the consistency pass — a brand-new file is where folder placement
and naming actually get decided. For each one, check it sits in the right directory for its kind
and is named per `CODE_REFERENCE.md` §2/§8, and that any new API hook is wired into its domain
`index.ts` barrel.

## Establish the baseline first

Before delegating, work out what the branch actually adds, so the review compares against the right
neighbours:

```sh
git diff --merge-base origin/dev --name-status
```

Note any **new** files (status `A`) and untracked ones, and identify for each the nearest existing
equivalent — the sibling in the same `src/api/<domain>/` or `src/modules/<feature>/`, or the closest
analogous module if the feature is new. Pass those reference paths to the code-review skill along
with the instruction above. If the branch only touches existing files, say so — the consistency pass
is then limited to whether the edits match the file they're in.

## Rubric

@REVIEW.md

The consistency pass additionally answers to `CODE_REFERENCE.md` — §2 folder structure, §3 component
file structure, §8 naming conventions, §9 barrel exports — and to the topic rules in
`.claude/rules/` (`code-quality-rules.md` for naming and prohibited patterns, `api-rules.md` for the
hook contract, `frontend-rules.md` for component conventions). Read the relevant one rather than
guessing; when the standard and the surrounding code disagree, the standard wins and the divergence
gets noted as 🟣 Pre-existing.

## Notes

- If the diff is empty, report that there are no changes against `origin/dev` and stop.
- This compares against your LOCAL `origin/dev` ref. If it may be stale, run `git fetch origin dev`
  first to refresh the comparison base.
