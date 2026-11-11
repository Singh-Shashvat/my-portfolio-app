---
name: review-before-commit
description: Use before committing or opening a PR in FinPlan Admin — "review my changes", "is this ready to commit", "check this before I push", "did I miss anything". Runs yarn lint and yarn build and audits the working diff against CODE_REFERENCE.md and .claude/rules. For the deeper pre-push branch review, use the /review-branch slash command instead.
---

# Review before commit

A fast self-check on the working diff. For the deep pre-push review against `origin/dev` using
`REVIEW.md` as the rubric, use the **`/review-branch`** slash command instead.

## 1. Establish the diff

```bash
git status
git diff --merge-base origin/dev
git ls-files --others --exclude-standard   # new files are easy to forget
```

Review what changed. Don't audit the whole repo.

## 2. Run the gates

```bash
yarn lint
yarn build     # this IS the type-check — there is no typecheck script and no test suite
```

**`dev` has pre-existing lint errors.** Separate what your change introduced from what was already
broken — reporting inherited failures as yours wastes everyone's time. If in doubt, `git stash` and
re-run.

## 3. Audit

**Types**
- [ ] No `any` — including catch blocks and props
- [ ] No unused imports or variables (`noUnusedLocals`/`noUnusedParameters` **fail the build**)
- [ ] `import type` for type-only imports (`verbatimModuleSyntax`)
- [ ] Interfaces prefixed `I`; booleans `is/has/should/can`; no `data`/`temp`/`res` names

**Data layer**
- [ ] One hook per endpoint under `src/api/<domain>/`, exported from the barrel
- [ ] All HTTP via the `AxiosService` singleton — no `axios.create()`, no `fetch`
- [ ] Query key registered in `queryKeys.ts`, no inline strings
- [ ] **Every param that changes the response is in the `queryKey`**
- [ ] Mutations invalidate every affected list/detail/count key in `onSuccess`
- [ ] Errors re-thrown after `console.error`

**State**
- [ ] Server data only in React Query — no `useState`/Zustand mirror
- [ ] Filters/search/page in the URL via `useQueryParamsState`
- [ ] No prop drilling beyond 2 levels; narrow Zustand selectors

**Routing & access**
- [ ] Paths from `APP_ROUTES`; nothing hardcoded; `useAppNavigate` not raw `useNavigate`
- [ ] New routes inside `AuthenticatedRoute` + `RoleProtectedRoute`
- [ ] Roles from a named `USER_ROLES` group constant, not an inline array
- [ ] **Every new route has an explicit role decision**

**UI**
- [ ] Existing `Custom*` components reused — nothing re-rolled
- [ ] Tailwind classes only; no inline `style`; `cn()` for composition; no dynamic class names
- [ ] Theme tokens in `src/index.css`, not `tailwind.config.ts` (not loaded in v4)
- [ ] Loading, empty, error, and loaded states all handled
- [ ] Forms use Formik + Zod (not react-hook-form); errors gated on `touched`; submit disabled while
      pending
- [ ] `getMessageFromError` for display; no raw `error.message`; no duplicate toast for 5xx
- [ ] Destructive actions behind `ConfirmModal`

**Hygiene**
- [ ] No `console.log` (zero in `src/` today — keep it that way)
- [ ] No commented-out code, no leftover debug UI
- [ ] No secrets; config via `config`, never `import.meta.env`
- [ ] The floating "Fetch auth session" button in `src/main.tsx` is **known intentional dev
      tooling** — don't flag it

## 4. Report

1. **Blocking** — with `file.ts:line`, what breaks, and the fix
2. **Should fix** — real problems, not blockers
3. **Optional** — nits, labelled as optional
4. **Gates** — actual `yarn lint` / `yarn build` output, with pre-existing failures called out
   separately

Don't invent findings to fill sections. "Nothing found here" is a good answer.

## Committing

Only commit when asked. If on `dev` (the default branch), branch first.
