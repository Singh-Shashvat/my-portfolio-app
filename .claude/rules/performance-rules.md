# Rule: Performance

Authority: [CODE_REFERENCE.md](../../CODE_REFERENCE.md) §13.

This is a Vite SPA. There are no Server Components, no `next/image`, and no server-side caching
layer to lean on — **everything ships to the browser**, so bundle size and query hygiene are the two
levers that actually matter.

## Query hygiene (biggest win)

- Global defaults in [`reactQueryConfig.ts`](../../src/config/reactQueryConfig.ts): `staleTime`
  5 min, `retry` 2, no refetch on window focus. Only override per-hook when that endpoint genuinely
  differs, and comment why.
- **Correct, complete query keys.** Every param that changes the response belongs in the key —
  otherwise you serve stale data *and* defeat the cache.
- Invalidate narrowly. `invalidateQueries({ queryKey: [queryKeys.GET_ALL_LEADS] })` prefix-matches
  every page/filter variant; invalidating the whole client refetches the world.
- Use `enabled` to prevent dependent queries firing with undefined ids.
- Don't call the same hook in three sibling components — lift it once and pass down (within the
  2-level prop limit), or let the shared cache do its job with identical keys.

## Lists and tables

- **Server-side pagination always.** Never fetch all records and slice client-side.
- Debounce keyword search (`useDebounce`) before it reaches the query key.
- Keep `TableColumn.render` cheap — no per-row `new Date()` formatting chains or array searches.
  Precompute in a `useMemo` over the row set, or in `<feature>.utils.ts`.
- Give `CustomTable` a stable `getRowKey`; never use the array index as a React key for rows that
  can reorder.
- If a table ever legitimately needs to render 1000+ rows at once, virtualise — but first check
  whether it should be paginated instead. It almost always should.

## Rendering

- Select narrowly from Zustand: `useAppStore((state) => state.user)`, not the whole store.
- `useMemo`/`useCallback` where a real cost exists (large derived lists, values feeding a memoised
  child). Don't sprinkle them on every handler — that's noise, not optimisation.
- Never create component definitions inside render.
- Stable keys everywhere in mapped output.

## Bundle

- Route-level `React.lazy` + `Suspense` is the intended split for heavy screens (§13). **None is in
  place today** — `Routes.tsx` imports every page eagerly. Worth doing for the heaviest routes
  (recharts dashboards, PDF viewers) before adding more weight.
- `recharts`, `lottie-react`, and the PDF viewer are the heavy dependencies. Prefer lazy-loading them
  over pulling in another charting or animation library.
- Check before adding any dependency — `package.json` already carries strays (`add`, `input`,
  `breadcrumb`, `react-hook-form` with zero usages). Don't add to the pile.

## Images & assets

Plain `<img>` / `CustomImage` — there is no image optimisation pipeline. Set explicit dimensions to
avoid layout shift, use `loading="lazy"` for below-the-fold images, and keep static assets in
`src/assets/` reasonably sized.

## Perceived speed

- Skeletons shaped like the real content (`CustomTable` has `isLoading` + `skeletonCount`), not a
  centred spinner over an empty page.
- Reserve space for async content so nothing jumps.
- Keep the submit button in place while pending — swap its label/spinner, don't re-layout the form.
