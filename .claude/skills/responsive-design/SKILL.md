---
name: responsive-design
description: Implement modern responsive layouts using container queries, fluid typography, CSS Grid, and mobile-first breakpoint strategies. Use when building adaptive interfaces, implementing fluid layouts, or creating component-level responsive behavior.
---

# Responsive Design

Master modern responsive design to build interfaces that adapt seamlessly across screen sizes and device contexts.

This project is **FinPlan Admin**: a React 19 + **Vite** SPA, **Tailwind CSS v4**, shadcn/ui. Read
the "Project Conventions" section first — it overrides any generic advice below that conflicts with
it.

## When to Use This Skill

- Making a dense admin layout hold up between laptop and tablet widths
- Using container queries for components that live in varied contexts (cards inside a detail column
  vs. full width)
- Building layouts with CSS Grid and Flexbox
- Deciding a breakpoint strategy for a new screen
- Making wide data tables behave without breaking the page
- Adaptive navigation / sidebar collapse behaviour

## Project Conventions (read first)

1. **Desktop-first priority, not mobile-first.** This is an internal back-office tool used on
   laptops. Design for the dense desktop case, then make sure it degrades gracefully down to tablet.
   Don't invest in phone layouts for data grids. (Tailwind's utilities are still min-width based —
   you're setting priorities, not inverting the breakpoint system.)
2. **Not Next.js.** There is no `next/image`, no App Router, no Server Components. Images are plain
   `<img>` / `CustomImage`.
3. **Tailwind v4 — no plugins needed.** Container queries (`@container`, `@sm:`, `@md:`, `@lg:`) and
   `clamp()`-friendly utilities ship in core. Do **not** add `@tailwindcss/container-queries`.
4. **Design tokens live in `src/index.css`** under `@theme { }`. `tailwind.config.ts` exists but is
   **not loaded** in v4 — editing it does nothing.
5. **Wide tables scroll, they don't reflow.** Put them in `HorizontalScroll` (or an
   `overflow-x: auto` container). A table must never force the page body to scroll sideways.
6. **The sidebar collapse state is app state**, not a media query — it lives in `useAppStore`
   (`isSidebarCollapsed`, persisted). Don't reimplement it with CSS.
7. **Touch targets ≥ 44×44px** where touch is plausible (tablet use is real).
8. **No layout shift.** Reserve space with `aspect-ratio`, fixed boxes, and `CustomSkeleton`.

## Modern Breakpoint Scale

Tailwind defaults, mobile-first:

```
sm:  @media (min-width: 640px)   /* landscape phones, small tablets */
md:  @media (min-width: 768px)   /* tablets */
lg:  @media (min-width: 1024px)  /* laptops, small desktops */
xl:  @media (min-width: 1280px)  /* desktops */
2xl: @media (min-width: 1536px)  /* large desktops */
```

Set breakpoints based on **content** (where the layout actually breaks), not specific devices.

## Pattern 1: Container Queries (Tailwind v4)

Use for component-level responsiveness — a summary card should adapt to the space it's dropped into
(a narrow detail column vs. a full-width panel), not to the viewport. No plugin required in v4.

```tsx
// Mark the wrapper as a container, then query it with @ variants
function SummaryCard({ title, description, status }: SummaryCardProps) {
  return (
    <div className="@container">
      <article className="flex flex-col @md:flex-row @md:items-center @md:gap-4">
        <div className="shrink-0 @md:w-48">
          <h2 className="text-lg @md:text-xl font-semibold">{title}</h2>
          <StatusBadge status={status} />
        </div>
        <div className="mt-2 @md:mt-0">
          <p className="text-muted-foreground @md:line-clamp-3">{description}</p>
        </div>
      </article>
    </div>
  );
}
```

Raw CSS equivalent (only when Tailwind can't express it):

```css
.card-wrap { container-type: inline-size; container-name: card; }

@container card (min-width: 400px) {
  .card { display: grid; grid-template-columns: 200px 1fr; gap: 1rem; }
}

/* Container query units: 5% of container width, clamped 1rem–2rem */
.card-title { font-size: clamp(1rem, 5cqi, 2rem); }
```

## Pattern 2: Fluid Typography & Spacing

Use `clamp(min, preferred, max)` so type and spacing scale smoothly between breakpoints instead of jumping. Define tokens in the Tailwind v4 `@theme` block in the global stylesheet, then reference them.

```css
@theme {
  --text-fluid-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-fluid-xl:   clamp(1.25rem, 1rem + 1.25vw, 1.5rem);
  --text-fluid-3xl:  clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --text-fluid-4xl:  clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);

  --space-fluid-md:  clamp(1rem, 0.8rem + 1vw, 1.5rem);
  --space-fluid-lg:  clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
}
```

```tsx
// Inline clamp for one-off hero headings (matches the codebase's bracket style)
<h1 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em]">…</h1>
```

Helper for generating fluid values (min/max in rem, viewport in px):

```ts
function fluid(minRem: number, maxRem: number, minVw = 320, maxVw = 1280) {
  const slope = (maxRem - minRem) / (maxVw - minVw);
  const intercept = -minVw * slope + minRem;
  return `clamp(${minRem}rem, ${intercept.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxRem}rem)`;
}
```

## Pattern 3: CSS Grid Responsive Layouts

```tsx
// Stat / summary grid — fixed responsive columns (predictable, what this project uses)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  {summaryCards.map((card) => <SummaryCard key={card.id} {...card} />)}
</div>
```

```css
/* Auto-fit grid — items wrap on their own; great for unknown counts.
   The min(..., 100%) guard stops overflow on very narrow screens. */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 1.5rem;
}
```

```css
/* Named-area page layout that re-flows by breakpoint */
.page { display: grid; gap: 1rem; grid-template-areas: "header" "main" "sidebar" "footer"; }
@media (min-width: 768px) {
  .page { grid-template-columns: 1fr 300px;
          grid-template-areas: "header header" "main sidebar" "footer footer"; }
}
```

## Pattern 4: Responsive Navigation

The app shell in [src/components/layout/](../../../src/components/layout/) already implements the
sidebar/navbar behaviour, driven by `isSidebarCollapsed` in `useAppStore`. Extend it rather than
building a parallel nav. For a menu that collapses purely on width:

```tsx
<ul className={cn(
  "absolute top-full inset-x-0 flex flex-col border-b bg-background",
  isOpen ? "flex" : "hidden",
  // Desktop: always visible, horizontal, no chrome
  "lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent",
)}>
```

Keep tap targets ≥ 44px (`px-4 py-3` on mobile links).

## Pattern 5: Responsive Images

There is **no image optimisation pipeline** here — no `next/image`, no CDN transforms. Use plain
`<img>` or `CustomImage`, reserve the box to prevent layout shift, and lazy-load below-the-fold
images.

```tsx
<div className="relative aspect-square w-full overflow-hidden rounded-md">
  <img
    src={document.url}
    alt={document.name}
    loading="lazy"
    className="h-full w-full object-contain"
  />
</div>
```

For uploaded documents, prefer the existing viewers — `CustomImageViewer`, `CustomPdfModalViewer`,
`DocRenderComponent` — rather than rendering raw media yourself.

- `loading="lazy"` for anything below the fold; omit it for the few images that are immediately
  visible.
- Always set explicit dimensions or an `aspect-ratio` box — an unsized image is the most common
  source of layout shift here.
- Keep static assets in `src/assets/` reasonably sized; nothing resizes them at request time.

## Pattern 6: Responsive Tables

**Use `CustomTable`** — don't hand-roll `<table>`. Responsiveness is about the container around it.

```tsx
// Default: let the table keep its columns and scroll horizontally inside its own box.
<div className="w-full overflow-x-auto">
  <CustomTable columns={columns} data={rows} isLoading={isLoading} getRowKey={(row) => row.id} />
</div>
```

`HorizontalScroll` (`src/components/HorizontalScroll.tsx`) wraps this pattern with scroll
affordances — prefer it for the wide tables.

To reduce columns at narrow widths, use the `hidden` flag on the column config rather than
maintaining a second table:

```tsx
const columns: TableColumn<ILeadList>[] = [
  { key: "name", header: "Name", render: (row) => row.studentName },
  { key: "counsellor", header: "Counsellor", hidden: isNarrow, render: (row) => row.counsellorName },
];
```

Stacked-card fallbacks are rarely worth it here — staff use this on laptops, and a card list loses
the row-scanning that makes these screens fast.

For large datasets, paginate server-side rather than rendering everything.

## Viewport Units

```css
.hero      { min-height: 100dvh; } /* dynamic — accounts for mobile browser UI */
.min-hero  { min-height: 100svh; } /* smallest viewport */
/* Avoid bare 100vh on mobile — it overshoots and causes a jump. */
```

## Best Practices

1. **Desktop is the primary target**; degrade gracefully to tablet. Don't over-invest in phone
   layouts for dense data screens.
2. **Content breakpoints** — break where the layout breaks, not at device widths.
3. **Fluid over fixed** — `clamp()` for type/spacing; relative units over `px` for sizing.
4. **Container queries** for reusable components that live in varied contexts.
5. **Wide tables scroll horizontally in their own container** — never let the page body scroll
   sideways.
6. **Touch targets ≥ 44×44px** where touch is plausible.
7. **No layout shift** — reserve space with `aspect-ratio` / fixed boxes / `CustomSkeleton`.
8. **Logical properties** (`inline`/`block`, `inset-x`) where it aids future i18n.

## Common Issues

- **Horizontal overflow** — guard auto-fit grids with `minmax(min(300px, 100%), 1fr)`; watch fixed `min-w-[…]`.
- **`100vh` jump on mobile** — use `dvh`/`svh`.
- **Oversized images** — almost always a wrong/missing `sizes` prop.
- **Text too small on mobile** — use the fluid type scale.
- **Squished images** — set `aspect-ratio` and `object-contain`/`object-cover`.
- **Z-index / stacking** — overlays and portaled dropdowns (see the header glass dropdown) need explicit, sane `z` values.

## Resources

- CSS Container Queries — MDN
- Utopia Fluid Type Calculator — utopia.fyi
- Every Layout — every-layout.dev
- Tailwind v4 responsive + container query docs
