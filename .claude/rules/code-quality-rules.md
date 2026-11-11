# Rule: Code Quality

Authority: [CODE_REFERENCE.md](../../CODE_REFERENCE.md) §6, §8, §12, §14.

## TypeScript

- **No `any`.** Not in props, not in catch blocks, not "temporarily". Use `unknown` and narrow, or
  write the real type. `catch (error)` is already `unknown` — hand it to `getMessageFromError()`.
- `strict`, `noUnusedLocals`, and `noUnusedParameters` are on. An unused import or destructured
  variable **fails `yarn build`**, not just lint. Delete it.
- **`verbatimModuleSyntax` is on** — type-only imports must say `import type`:
  ```ts
  import type { IGetAllLeadsResponse } from "./leads.types";
  import { LeadStatusEnum } from "./leads.types";              // enums are values
  import { useQuery, type UseQueryResult } from "@tanstack/react-query";
  ```

## Naming

| Thing          | Convention                                                | Example                            |
| -------------- | --------------------------------------------------------- | ---------------------------------- |
| Interface      | `I` + PascalCase                                           | `ILeadList`, `IUser`               |
| Enum           | PascalCase name, `SCREAMING_SNAKE` members                 | `LeadStatusEnum.ALL`               |
| Component file | `PascalCase.tsx`                                           | `LeadsTable.tsx`                   |
| Hook file      | `useX.ts`                                                  | `useGetAllLeadsApi.ts`             |
| Types file     | `<domain>.types.ts` in `api/`, `<feature>.type.ts` in `modules/` | `leads.types.ts` / `leads.type.ts` |
| Constants file | `<feature>.constant.ts`                                    | `schemes.constant.ts`              |
| Boolean        | `is` / `has` / `should` / `can`                            | `isEditMode`, `hasNextStage`       |

The `api/*.types.ts` vs `modules/*.type.ts` asymmetry is real — match the folder you're in, don't
"fix" it. Never name a variable `data`, `temp`, `val`, `x`, or `res`.

## Prohibited patterns (§14)

- `any` types
- Inline `style={{}}` — Tailwind classes only
- Direct DOM manipulation (`document.getElementById(...).style`)
- Prop drilling more than 2 levels
- Hardcoded route paths, role strings, or config values — use `APP_ROUTES`, `USER_ROLES`, `config`,
  and per-feature `*.constant.ts`
- `import.meta.env` read directly — go through `config`
- New axios instances
- `console.log` (there are currently zero in `src/`; keep it that way)

## Error handling

[`getMessageFromError`](../../src/utils/index.ts) is the **single** place that normalises axios,
Amplify, and Cognito errors into a display string. Never read `error.message` directly.

```tsx
try {
  await createScheme(values);
  toast.success("Scheme created");
} catch (error) {
  toast.error(getMessageFromError(error));
}
```

- The axios response interceptor already toasts on **5xx**. Don't double-toast those.
- **4xx is the component's responsibility** — catch and surface it locally.
- `useAuthStore` methods **do not throw**; they resolve `{ success, response?, errorMsg? }`. Branch
  on `success` instead of wrapping in `try/catch`.
- Unexpected render errors are caught by the global `react-error-boundary`. Don't swallow errors to
  avoid it.

## Validation

- Forms: Zod schema in `<feature>.validation.ts`, wired to Formik through `toFormikValidationSchema`.
- Env: Zod-validated at startup in `env.config.ts`.
- Client-side validation is UX, never authorisation. The backend is the enforcement point.

## Security

- Never commit secrets. Everything `VITE_*` is public once built — treat it as such.
- Gate screens with `RoleProtectedRoute`; hiding a nav item is not access control.
- Confirm destructive actions with `ConfirmModal` / `ConfirmationModal`.

## Definition of done

A change is complete only when:

- `yarn lint` and `yarn build` both pass (build is the type-check — there is no `typecheck` script
  and no test suite)
- Loading, empty, and error states are all handled
- It is typed with no `any` and no unused symbols
- It reuses existing `Custom*` components rather than re-rolling them
- Role gating is explicit for any new route
- No `console.log`, no commented-out code, no stray debug UI
