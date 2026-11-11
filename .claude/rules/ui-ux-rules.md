# Rule: UI/UX Quality

Authority: [CODE_REFERENCE.md](../../CODE_REFERENCE.md) §3, §7.

This is an **internal staff dashboard**, not a marketing site. The bar is "a counsellor can work
through 200 leads without friction", not "premium hero section". Optimise for clarity, data density,
scannability, and speed. Consistency with the existing screens beats novelty every time.

## Use the shared components — this is the big one

`src/components/` already contains ~55 `Custom*` wrappers. Check before building anything:

`CustomTable` · `CustomInput` · `CustomSelect` · `CustomModal` · `CustomButton` · `CustomDatePicker`
· `CustomFileUpload` · `CustomTabs` · `CustomBadge` · `CustomChip` · `CustomCard` · `CustomSkeleton`
· `CustomCheckbox` · `CustomSwitch` · `CustomTextarea` · `CustomDropdown` · `CustomPhoneNumberInput`
· `CustomOtpInput` · `CustomBreadcrumbs` · `CustomLabelValuePair` · `CustomImageViewer`
· `CustomPdfModalViewer` · `TableSearchAndPagination` · `ConfirmModal` · `StatusBadge`
· `MultiSelectDropdown` · `Spinner` · `Icon` · `HorizontalScroll`

(`EmptySection` is currently feature-local at `src/modules/leads/components/detailsPage/` — promote
it to `src/components/` the first time a second module needs it, rather than copying it.)

Order of preference:

1. An existing `Custom*` component
2. A shadcn primitive in `src/components/ui/`
3. Extend an existing `Custom*` with a new optional prop
4. A new `Custom*` — only if more than one module will use it

Re-rolling a table, modal, or input that already exists is the single most common review rejection
in this repo.

## Styling

- **Tailwind v4 utility classes only.** No inline `style={{}}`, no CSS modules, no
  styled-components, no direct DOM style writes.
- Compose and dedupe with `cn()` from [`src/lib/utils.ts`](../../src/lib/utils.ts). Conditional
  classes go through `cn`, never string concatenation.
- Never build a class name dynamically (`` `text-${color}-500` ``) — Tailwind's scanner can't see it
  and the class won't exist. Map to complete literal strings.

### Theme tokens live in CSS, not JS

[`src/index.css`](../../src/index.css) uses `@import "tailwindcss"` plus `@theme { ... }`, and that
block is the only source of truth for design tokens. `tailwind.config.ts` exists but **is not
loaded** — there is no `@config` directive, so Tailwind v4 never reads it. Editing it does nothing.
Add or change tokens in `src/index.css`.

## Required states

Every data-driven view handles all four, explicitly:

| State   | How                                                                   |
| ------- | --------------------------------------------------------------------- |
| Loading | `CustomSkeleton` shaped like the real content (`CustomTable` has `isLoading` + `skeletonCount`) |
| Empty   | A clear "no records" row or panel — never a blank area                 |
| Error   | `getMessageFromError(error)` surfaced in place, plus a retry where sensible |
| Loaded  | The real content                                                       |

A screen missing any of these is not done.

## List / table screens

This is the dominant screen type in the app. Follow the existing leads and course-payment screens.

- `CustomTable` with a typed `columns: TableColumn<T>[]`. Never hand-roll `<table>`.
- `TableSearchAndPagination` for search + paging; debounce keyword input with `useDebounce`.
- Keep filters, search, and page in the **URL** via `useQueryParamsState` so views are shareable and
  survive refresh.
- Show which filters are active and give a way to clear them.
- Server-side pagination — never fetch every record and slice on the client.
- Bulk actions use `CustomTable`'s built-in row selection (`enableRowSelection`, `getRowKey`,
  `onSelectionChange`), as `LeadsTable` does.

## Forms & destructive actions

- Formik + Zod, bound to `Custom*` inputs. Errors show only after touch.
- Disable submit while pending; show a spinner in the button, don't swap the layout.
- Success and failure both produce a `sonner` toast.
- **Every destructive action goes through `ConfirmModal`/`ConfirmationModal`** with a specific
  message naming what will be affected.

## Layout & responsiveness

Primary target is **desktop** — this is a dense back-office tool used on laptops. Layouts should
still degrade gracefully down to tablet, and wide tables should scroll horizontally inside their own
container (`HorizontalScroll`) rather than breaking the page. Don't invest in phone-first layouts
for dense data grids; do keep touch targets sane.

## Motion

Subtle and functional only: modal/drawer transitions, hover and focus affordances, skeleton
shimmer. No section-reveal animation, no parallax, no decorative motion. Nothing that shifts layout
or delays a staff member's next click.
