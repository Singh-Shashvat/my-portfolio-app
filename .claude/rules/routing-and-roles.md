# Rule: Routing, Auth & Roles

Authority: [CODE_REFERENCE.md](../../CODE_REFERENCE.md) §11.
Files: [`src/route/index.ts`](../../src/route/index.ts), [`src/route/Routes.tsx`](../../src/route/Routes.tsx).

## Paths

Every path lives in `APP_ROUTES` in `src/route/index.ts`. **Never hardcode a path string** in a
component, redirect, or link.

Static paths are strings; dynamic paths are **functions**:

```ts
APP_ROUTES.APP.LEADS.ROOT                          // "/leads"
APP_ROUTES.APP.LEADS.STUDENT_DETAILS(studentId)
APP_ROUTES.APP.LEADS.RESULTS(studentId, applicationId)
APP_ROUTES.APP.COURSES.EDIT_COURSE(courseId)
APP_ROUTES.APP.NBFC_LOAN.DETAILS(loanId)
```

The object is `as const`, so adding the entry is what makes it type-safe everywhere. Add the entry
first, then use it.

Navigate with [`useAppNavigate()`](../../src/hooks/useAppNavigate.ts), not raw `useNavigate()`.

## Registering a route

Nest under the right guards in `Routes.tsx`:

```tsx
<Route element={<AuthenticatedRoute />}>
  <Route element={<AuthenticatedUserLayout />}>
    <Route element={<RoleProtectedRoute allowedRoles={FEE_ROLES} />}>
      <Route path={APP_ROUTES.APP.APPLICATION_FEE.ROOT} element={<ApplicationFee />} />
    </Route>
  </Route>
</Route>
```

- `AuthenticatedRoute` verifies the Cognito session and loads the user into `useAppStore`.
- `RoleProtectedRoute allowedRoles={[...]}` gates by role and redirects unauthorised users to their
  own landing route via `getLandingRoute`.
- Role groups are already declared at the top of `Routes.tsx`: `ALL_ROLES`, `ADMIN_ONLY`,
  `TEAM_LEADER_ONLY`, `FEE_ROLES`, `LOAN_ROLES`, `COUPON_ROLES`, `DASHBOARD_ROLES`, `SCHEME_ROLES`.
  **Reuse one, or add a new named constant beside them — never inline an array literal in JSX.**

## Roles

`USER_ROLES` from [`finplanUser.types.ts`](../../src/api/finplanUsers/finplanUser.types.ts):
`ADMIN`, `TEAM_LEADER`, `COUNSELLOR`, `LOAN_DEPARTMENT`, `FEE_DEPARTMENT`.

Always reference `USER_ROLES.X`, never the raw string.

**A new screen without an explicit role decision is incomplete.** If the right roles aren't obvious
from the feature, ask — don't quietly default to `ALL_ROLES`.

Route gating is the only place role-based access is expressed on the frontend, and it is still only
a UX affordance: hiding a nav item is not access control, and the backend must enforce the same
rules independently.

## Auth session

- Amplify is configured in [`src/App.tsx`](../../src/App.tsx) from `awsAmplifyConfig`. MFA off, email
  verification on.
- The axios request interceptor pulls the access token via `fetchAuthSession()` on every call — you
  never attach `Authorization` yourself.
- `useAuthStore` wraps every Amplify operation and **does not throw**; it resolves
  `{ success, response?, errorMsg? }`. Branch on `success`.
- Guards sign the user out when `userData.success === false || !userData.data`.
- `RETURN_TO_KEY` in `src/route/index.ts` carries the post-login redirect target — use it rather than
  inventing another mechanism.

## Config

Read every environment value through the `config` object from
[`env.config.ts`](../../src/config/env.config.ts), which Zod-validates all `VITE_*` vars at startup.
Never touch `import.meta.env` directly. Remember that `VITE_*` values ship to the browser.
