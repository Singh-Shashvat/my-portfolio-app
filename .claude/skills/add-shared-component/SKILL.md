---
name: add-shared-component
description: Use when creating or extending a reusable component in FinPlan Admin — "make this reusable", "add a shared component", "new Custom* component", "extract this into a component", "add a variant/prop to CustomX". Enforces checking the existing ~55 Custom* wrappers first, and the props/typing/state conventions for src/components/.
---

# Add or extend a shared component

## Check first — this is most of the job

`src/components/` already has ~55 `Custom*` wrappers. Grep before building:

```bash
ls src/components/
grep -rl "CustomSelect\|MultiSelectDropdown" src/modules | head
```

Existing: `CustomTable` · `CustomInput` · `CustomSelect` · `CustomModal` · `CustomButton` ·
`CustomButtonGroup` · `CustomDatePicker` · `CustomFileUpload` · `CustomTabs` · `CustomBadge` ·
`CustomChip` · `CustomCard` · `CustomSkeleton` · `CustomCheckbox` · `CustomSwitch` ·
`CustomTextarea` · `CustomDropdown` · `CustomPhoneNumberInput` · `CustomOtpInput` ·
`CustomBreadcrumbs` · `CustomLabelValuePair` · `CustomImage` · `CustomImageViewer` ·
`CustomPdfModalViewer` · `CustomTooltipCard` · `TableSearchAndPagination` · `ConfirmModal` ·
`StatusBadge` · `MultiSelectDropdown` · `HorizontalScroll` · `Spinner` · `Icon` · and more.

**Order of preference:**

1. Use the existing `Custom*` as-is
2. Use a shadcn primitive from `src/components/ui/`
3. **Extend an existing `Custom*` with a new optional prop** ← usually the right answer
4. Create a new `Custom*` — only when two or more modules will use it

Re-rolling a table, modal, or input that already exists is the single most common review rejection
in this repo. A component used by exactly one module belongs in
`src/modules/<feature>/components/`, not `src/components/`.

## Extending an existing component

- New props must be **optional with sensible defaults** so every current call site keeps working.
- Add to the existing props interface in the same file; don't fork the component.
- Check the call sites before changing any existing prop's behaviour:
  ```bash
  grep -rn "CustomSelect" src/modules | wc -l
  ```

## Writing a new one

```tsx
import { cn } from "@/lib/utils";

interface CustomThingProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  className?: string;
}

const CustomThing = ({ label, value, onChange, isDisabled = false, className }: CustomThingProps) => {
  return (
    <div className={cn("flex flex-col gap-1", isDisabled && "opacity-50", className)}>
      ...
    </div>
  );
};

export default CustomThing;
```

Conventions:

- `PascalCase.tsx`, one component per file, props interface directly above, default export at the
  bottom.
- **Always accept `className`** and merge it last through `cn()` so callers can adjust spacing
  without a wrapper div.
- Booleans use `is`/`has`/`should`/`can`. No `any`. Generic over the row/item type where it makes
  sense — `CustomTable<T>` is the model.
- **No data fetching inside a shared component.** It takes props; the caller owns the query. A
  shared component that calls `useGetAllLeadsApi` is not shared.
- No feature-specific vocabulary in a shared component. If it mentions "lead" or "NBFC", it belongs
  in a module.
- Keep internal state minimal, and support both controlled and uncontrolled use where it's cheap —
  `TableSearchAndPagination` does this with `const isControlled = searchValueProp !== undefined`.

## Styling

Tailwind v4 classes composed with `cn()`. No inline `style`, no dynamically built class names
(`` `text-${x}-500` `` won't exist — Tailwind's scanner can't see it). Design tokens go in
`src/index.css` under `@theme`, **not** `tailwind.config.ts` — that file is not loaded in v4.

## Accessibility

Label every input; keep native semantics (`<button>` for actions, not a clickable `<div>`); ensure
focus is visible; support Escape-to-close and focus trapping on overlays (the Radix primitives
under `src/components/ui/` give you this for free — prefer them over hand-rolled overlays).

## Before you're done

- [ ] Confirmed no existing component already does this
- [ ] Placed correctly: `src/components/` only if 2+ modules use it
- [ ] `className` accepted and merged with `cn()`
- [ ] Fully typed, no `any`, optional props have defaults
- [ ] No data fetching, no feature-specific logic
- [ ] Existing call sites still compile
- [ ] `yarn lint` and `yarn build` pass
