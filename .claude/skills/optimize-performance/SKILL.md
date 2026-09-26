---
name: optimize-performance
description: Use when a FinPlan Admin screen is slow or heavy — "the page is slow", "the table lags", "too many network calls", "reduce bundle size", "it refetches constantly", "duplicate requests". Covers React Query key/cache hygiene, list rendering cost, re-render sources, and route-level code splitting for this Vite SPA.
---

# Optimise performance

FinPlan Admin is a **Vite SPA** — everything ships to the browser. There are no Server Components,
no `next/image`, and no server cache. The levers that matter are query hygiene, render cost, and
bundle size, roughly in that order.

## Measure first

Never optimise on instinct. Establish the cost before changing anything:

```bash
yarn build          # prints per-chunk sizes — the source of truth for bundle claims
```

- Read the actual `queryKey`, `staleTime`, and `enabled` on the slow screen
- Count components calling the same hook, and check whether their keys match — mismatched keys mean
  duplicate network calls that look identical in the Network tab
- Look at what each `TableColumn.render` does per row

State what you measured in your report. "Feels slow" is not a finding.

## 1. Query hygiene — usually the whole problem

- **Incomplete `queryKey`** → stale data *and* cache thrash. Every param that changes the response
  must be in the key. Check this first, every time.
- **Over-broad invalidation** → refetching the world. Invalidate the specific list/detail/count keys
  the write touched, not everything.
- **Missing `enabled`** → queries firing with `undefined` ids, then refiring. Use `enabled: !!id`.
- **Divergent keys for the same data** → two components fetch the same endpoint separately. Unify
  the keys and the cache does the deduplication for you.
- Global defaults (`staleTime` 5 min, `retry` 2, no refetch on focus) live in
  `src/config/reactQueryConfig.ts`. Override per hook only with a reason, and comment it.

## 2. Lists and tables

- **Server-side pagination.** Never fetch all records and slice client-side.
- Debounce keyword search with `useDebounce` *before* the value reaches the query key.
- Keep `render` functions cheap — no per-row date-parsing chains or `array.find` lookups. Precompute
  in a `useMemo` over the row set, or in `<feature>.utils.ts`.
- Stable `getRowKey` from a real id. Never the array index for rows that can reorder.
- 1000+ rows on screen: first ask whether it should be paginated. It almost always should be.

## 3. Re-renders

- Narrow Zustand selectors: `useAppStore((state) => state.user)`, not the whole store.
- `useMemo`/`useCallback` only where a real cost exists — a large derived list, or a value feeding a
  memoised child. **Don't sprinkle them on every handler**; unjustified memoisation is noise that
  hides real hotspots and costs review time.
- Never define a component inside another component's render.

## 4. Bundle

`src/route/Routes.tsx` imports **every page eagerly** — there is no `React.lazy` in the codebase
today. Route-level splitting is the largest available win:

```tsx
const Dashboard = lazy(() => import("@/modules/dashboard/pages/Dashboard"));
```

Start with the heaviest: recharts dashboards, the PDF viewer, lottie. Wrap in `Suspense` with a
skeleton fallback.

Don't add a dependency to solve a performance problem. `package.json` already carries unused strays
(`add`, `input`, `breadcrumb`, `react-hook-form`) — removing genuinely dead deps is itself a valid
optimisation, but grep the whole repo before removing anything.

## 5. Perceived speed

Skeletons shaped like the real content (`CustomTable` has `isLoading` + `skeletonCount`), not a
centred spinner on a blank page. Reserve space for async content so nothing jumps. Keep the submit
button in place while pending — swap label/spinner rather than re-laying-out.

## Report

For each change: what you measured → what you changed → expected effect. Run `yarn lint` and
`yarn build`, give the real output including chunk sizes if bundle size was the target, and keep
"changed" separate from "recommended but not done". Don't change behaviour while optimising; if a
fix alters what the user sees, flag it.
