---
name: add-module-screen
description: Use when adding a new page/screen to FinPlan Admin — "add a page", "new screen for X", "add a details page", "create a route", "add a tab to X". Covers module folder layout, page composition, APP_ROUTES registration, and RoleProtectedRoute gating. For a full list+create+edit+delete slice use add-crud-feature.
---

# Add a module screen

Reference module: `src/modules/leads/` (list screen, details screen, and nested sections).

## 1. Decide the roles

Which of `ADMIN`, `TEAM_LEADER`, `COUNSELLOR`, `LOAN_DEPARTMENT`, `FEE_DEPARTMENT` should reach this
screen? **A screen without an explicit role decision is not finished.** If the request doesn't make
it obvious, ask — don't default to `ALL_ROLES`.

## 2. Place the files

```
src/modules/<feature>/
├── pages/<Screen>.tsx        # route-level; composition + data wiring only
├── components/               # feature-only pieces (nest modals/, detailsPage/ as they grow)
├── <feature>.constant.ts     # options, labels, page sizes — no magic values inline
├── <feature>.type.ts         # UI-only types
└── <feature>.utils.ts        # mapping/formatting/branching logic
```

Shared across features → `src/components/`. Used only here → this module's `components/`.

## 3. Compose the page

A page component wires data and lays out sections. It does not hold business logic.

```tsx
const CoursePaymentDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetCoursePaymentByIdApi({
    params: { id },
    enabled: !!id,
  });

  if (isLoading) return <CoursePaymentDetailsSkeleton />;
  if (isError) return <Error message={getMessageFromError(error)} />;
  if (!data?.data) return <EmptyState />;

  return (
    <CustomPage title="Course payment">
      <CustomBreadcrumbs items={...} />
      <PaymentSummary payment={data.data} />
      <PaymentTimeline payment={data.data} />
    </CustomPage>
  );
};

export default CoursePaymentDetails;
```

- `enabled: !!id` so the query doesn't fire with an undefined route param.
- Use existing shells: `CustomPage`, `CustomCard`, `CustomTabs`, `CustomBreadcrumbs`.
- Data comes from `src/api/` hooks only — never call `AxiosService` from a component.

## 4. Register the route

Path first, in `src/route/index.ts`. Dynamic paths are **functions**:

```ts
COURSE_PAYMENT: {
  ROOT: "/course-payments",
  DETAILS: (id: string) => `/course-payments/${id}`,
},
```

Then in `src/route/Routes.tsx`, nested inside the guards:

```tsx
<Route element={<AuthenticatedRoute />}>
  <Route element={<AuthenticatedUserLayout />}>
    <Route element={<RoleProtectedRoute allowedRoles={FEE_ROLES} />}>
      <Route path={APP_ROUTES.APP.COURSE_PAYMENT.DETAILS(":id")} element={<CoursePaymentDetails />} />
    </Route>
  </Route>
</Route>
```

Reuse a named role group from the top of `Routes.tsx` (`ADMIN_ONLY`, `FEE_ROLES`, `LOAN_ROLES`,
`COUPON_ROLES`, …) or add a new named constant beside them. **Never inline an array literal.**

Navigate to it with `useAppNavigate()` and `APP_ROUTES.…` — never a hardcoded string, never raw
`useNavigate`.

## 5. Required states

Loading (`CustomSkeleton`, shaped like the real content) · Empty · Error (`getMessageFromError`) ·
Loaded. All four, explicitly. A screen missing any of them isn't done.

## 6. Sidebar

If it needs a nav entry, add it where the others live and gate it by the same roles. Hiding the link
is not access control — the route guard is what matters.

## Before you're done

- [ ] Roles decided and applied
- [ ] Path in `APP_ROUTES`; no hardcoded strings anywhere
- [ ] Data via `src/api/` hooks with `enabled` guarding undefined params
- [ ] Loading, empty, error, loaded all handled
- [ ] Existing `Custom*` components reused
- [ ] No `any`, no `console.log`, no unused imports (they fail the build)
- [ ] `yarn lint` and `yarn build` pass
