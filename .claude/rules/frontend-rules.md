# Rule: Frontend Development

Authority: [CODE_REFERENCE.md](../../CODE_REFERENCE.md) §3, §4, §7, §10.

## App shell

- Vite SPA with `BrowserRouter`. Everything is a Client Component — there is no server/client split
  to reason about, and no `"use client"` directive anywhere.
- Page titles / meta go through `react-helmet-async`, not a Next.js `metadata` export.
- Imports use the `@/` alias for `src/` (`@/components/CustomInput`), never deep relative chains.

## Folder placement

```
src/modules/<feature>/
├── pages/           # route-level screens
├── components/      # feature-only components (nest modals/ and detailsPage/ as they grow)
├── <feature>.constant.ts
├── <feature>.type.ts
├── <feature>.utils.ts
└── <feature>.validation.ts   # Zod schemas, when the feature has forms
```

Shared across features → `src/components/`. Used by one feature → that feature's `components/`.
Follow [`src/modules/leads/`](../../src/modules/leads/) as the reference layout.

## React

- One component per file, `PascalCase.tsx`, props interface directly above the component, default
  export at the bottom.
- Keep components rendering. Mapping, formatting, and branching logic belongs in `<feature>.utils.ts`;
  data access belongs in `src/api/`.
- Prefer composition over configuration flags. If a component has grown a fourth boolean `variant`
  prop, split it.
- **No prop drilling beyond 2 levels** — use Zustand ([state-management.md](state-management.md)).
- `useState` only for state that one component owns. Never mirror server or store data into it.

## Forms — Formik + Zod

**Formik is the form library here, not react-hook-form.** Reference:
[`src/modules/schemes/components/NewSchemeModal.tsx`](../../src/modules/schemes/components/NewSchemeModal.tsx).

```tsx
const formik = useFormik<SchemeFormValues>({
  initialValues: { schemeCode: "", interestRatePercent: 0 },
  validationSchema: toFormikValidationSchema(schemeFormSchema),
  onSubmit: async (values) => { await createScheme(values); onOpenChange(false); },
});
```

- Zod schema + its inferred `type XFormValues = z.infer<typeof xSchema>` live in
  `<feature>.validation.ts`.
- Bind fields to the `Custom*` inputs (`CustomInput`, `CustomSelect`, `CustomDatePicker`,
  `CustomPhoneNumberInput`) — never raw `<input>`.
- Show an error only once the field is touched: `touched.x && errors.x`.
- Disable the submit button while `formik.isSubmitting || mutation.isPending`.
- For edit modals, sync `initialValues` via `formik.setValues` in a `useEffect` keyed on the open
  flag and the record — see the reference file.

## Data fetching

All server state goes through TanStack Query hooks in `src/api/` — see
[api-rules.md](api-rules.md). Never call `AxiosService` directly from a component, and never
duplicate a request that a hook already exposes.

Every data-driven view handles four states explicitly: **loading** (`CustomSkeleton`), **error**
(`getMessageFromError`), **empty**, and **loaded**. A view missing any of these is incomplete.

## URL state for list views

Filters, search, and pagination belong in the URL so screens are shareable and survive refresh. Use
[`useQueryParamsState`](../../src/hooks/useQueryParamsState.ts), and debounce keyword input with
[`useDebounce`](../../src/hooks/useDebounce.ts). There is no `localStorage` persistence pattern in
this app — don't introduce one.

## Styling

Tailwind v4 utility classes composed with `cn()`. See [ui-ux-rules.md](ui-ux-rules.md) for the
component library and the Tailwind-v4 theming gotcha.
