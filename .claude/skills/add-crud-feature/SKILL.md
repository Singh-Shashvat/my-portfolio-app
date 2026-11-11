---
name: add-crud-feature
description: Use when building a new management screen in FinPlan Admin — "add a CRUD screen", "manage X", "list/create/edit/delete X", "new admin section", "add a module for X". Walks the full vertical slice: API hooks, module folder, list table, create/edit modal, delete confirmation, route registration, and role gating.
---

# Add a CRUD feature

The standard FinPlan Admin management screen: a paginated list, a create/edit modal, and a confirmed
delete. Reference implementations: `src/modules/schemes/`, `src/modules/coupons/`,
`src/modules/courses/`.

Related: [add-api-endpoint](../add-api-endpoint/SKILL.md), [add-form](../add-form/SKILL.md),
[add-list-view](../add-list-view/SKILL.md).

## 0. Decide the roles first

Which of `ADMIN`, `TEAM_LEADER`, `COUNSELLOR`, `LOAN_DEPARTMENT`, `FEE_DEPARTMENT` may see this
screen? **If it isn't obvious from the request, ask.** Don't default to `ALL_ROLES` — that silently
exposes an internal screen to every department.

## 1. API layer — `src/api/<domain>/`

One hook per endpoint (list, get-by-id, create, update, delete). Follow
[add-api-endpoint](../add-api-endpoint/SKILL.md) exactly: types → `queryKeys.ts` → hook → barrel →
invalidation.

Create, update, and delete all invalidate the list key (and the detail key where relevant) in
`onSuccess`.

## 2. Module — `src/modules/<feature>/`

```
pages/<Feature>.tsx              # list screen, wired to the route
components/<Feature>Table.tsx    # CustomTable + columns
components/New<Feature>Modal.tsx # create + edit in one modal
<feature>.constant.ts            # select options, page size, column config
<feature>.type.ts                # UI-only types
<feature>.validation.ts          # Zod schema + inferred form values type
```

## 3. List screen

- `CustomTable` with typed `columns: TableColumn<T>[]` — never hand-roll `<table>`
- `TableSearchAndPagination` for search + paging
- **Server-side pagination.** Never fetch every record and slice client-side
- Filters, search, and page held in the URL via `useQueryParamsState`; keyword input debounced with
  `useDebounce`
- `isLoading` + `skeletonCount` on `CustomTable` for the loading state
- Explicit empty state and an error state using `getMessageFromError`
- Row actions (edit / delete) in a trailing column; bulk actions via `CustomTable`'s
  `enableRowSelection` + `getRowKey` + `onSelectionChange`

## 4. Create / edit modal

One `CustomModal` handling both, keyed off whether a record was passed in:

```tsx
const isEditMode = !!recordToEdit;
```

Formik + a Zod schema via `toFormikValidationSchema`, bound to `Custom*` inputs. Sync
`initialValues` with `formik.setValues` in a `useEffect` on open. See
[add-form](../add-form/SKILL.md) and `src/modules/schemes/components/NewSchemeModal.tsx`.

Disable submit while `isSubmitting || isPending`. Toast success and failure with `sonner`.

## 5. Delete

Always behind `ConfirmModal` / `ConfirmationModal`, with a message naming the specific record. Never
delete on a single click.

## 6. Route + roles

Add the path to `APP_ROUTES` in `src/route/index.ts` (dynamic paths are functions), then register in
`Routes.tsx`:

```tsx
<Route element={<RoleProtectedRoute allowedRoles={FEE_ROLES} />}>
  <Route path={APP_ROUTES.APP.MY_FEATURE.ROOT} element={<MyFeature />} />
</Route>
```

Reuse a named role group from the top of `Routes.tsx` or add a new one — never an inline array
literal. Add the sidebar entry gated by the same roles.

## Definition of done

- [ ] Roles decided explicitly and applied via `RoleProtectedRoute`
- [ ] Path in `APP_ROUTES`, nothing hardcoded
- [ ] Every query key registered in `queryKeys.ts` and complete (all params that affect the response)
- [ ] Every mutation invalidates every affected list/detail/count key
- [ ] Loading, empty, error, and loaded states all handled
- [ ] Delete confirmed; success and failure both toast
- [ ] Existing `Custom*` components reused, nothing re-rolled
- [ ] No `any`, no `console.log`, no unused imports (they fail the build)
- [ ] `yarn lint` and `yarn build` pass

Remember: client-side role gating is UX, not authorisation. The backend must enforce the same rules.
