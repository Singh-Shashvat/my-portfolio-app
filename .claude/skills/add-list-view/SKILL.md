---
name: add-list-view
description: Use when building or fixing a table/list screen in FinPlan Admin — "add a table", "add search to X", "add filters", "add pagination", "make the list filterable", "filters reset on refresh", "search fires on every keystroke". Covers CustomTable, TableSearchAndPagination, URL-backed filter state, debounced search, and server-side paging.
---

# Add a list view with search, filters & pagination

The dominant screen type in FinPlan Admin. Reference: `src/modules/leads/components/LeadsTable.tsx`
and `src/modules/leads/pages/Leads.tsx`.

## The pieces

| Need                | Use                                                                    |
| ------------------- | ---------------------------------------------------------------------- |
| Table               | `CustomTable` (`src/components/CustomTable.tsx`)                        |
| Search + pagination | `TableSearchAndPagination` (`src/components/TableSearchAndPagination.tsx`) |
| Filter state        | `useQueryParamsState` (`src/hooks/useQueryParamsState.ts`)               |
| Debounce            | `useDebounce` (`src/hooks/useDebounce.ts`)                              |
| Multi-select filter | `MultiSelectDropdown` / `CustomSelect`                                  |
| Loading             | `CustomTable`'s `isLoading` + `skeletonCount`                           |

Never hand-roll a `<table>`, a pagination control, or a search input.

## Filter state belongs in the URL

So a screen survives refresh and can be shared with a colleague — which is exactly what staff do when
escalating a case.

```tsx
const { params, updateParams } = useQueryParamsState({
  page: 1,
  limit: 10,
  search: "",
  status: "ALL",
});
```

`useQueryParamsState` coerces numbers based on the default's type and deletes empty/null values
rather than writing blanks.

**Reset `page` to 1 whenever a filter or the search term changes** — otherwise the user lands on
page 7 of a 2-page result and sees an empty table.

```tsx
const handleStatusChange = (status: string) => updateParams({ status, page: 1 });
```

## Debounce the search, not the fetch

Debounce before the value reaches the query key, so React Query isn't asked for a new key on every
keystroke:

```tsx
const debouncedSearch = useDebounce(params.search, 400);

const { data, isLoading, isError, error } = useGetAllLeadsApi({
  params: { page: params.page, limit: params.limit, search: debouncedSearch, status: params.status },
});
```

Every one of those params must also appear in the hook's `queryKey` — see
[add-api-endpoint](../add-api-endpoint/SKILL.md). A param that reaches the request but not the key
serves stale rows.

## Pagination is server-side

The API returns the page plus a total. Never fetch all records and slice client-side.

```tsx
<TableSearchAndPagination
  searchValue={params.search}
  onSearchChange={(value) => updateParams({ search: value, page: 1 })}
  currentPage={params.page}
  pageSize={params.limit}
  totalItems={data?.data?.total ?? 0}
  onPageChange={(page) => updateParams({ page })}
  onClear={() => updateParams({ search: "", page: 1 })}
/>
```

## Columns

```tsx
const columns: TableColumn<ILeadList>[] = [
  { key: "name", header: "Name", render: (row) => row.studentName },
  { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
];
```

- Keep `render` cheap — no date-parsing chains or array lookups per row. Precompute in `useMemo` or
  in `<feature>.utils.ts`.
- `hidden` on a column is the way to vary columns by role or tab — don't build two tables.
- Wide tables scroll horizontally inside `HorizontalScroll`; they must not break the page layout.

## Row selection for bulk actions

```tsx
<CustomTable
  enableRowSelection
  getRowKey={(row) => row.id}
  selectedRowKeys={selectedIds}
  onSelectionChange={(keys) => setSelectedIds(keys)}
  ...
/>
```

Use a stable id for `getRowKey` — never the array index, which breaks selection when rows reorder.

## Required states

- **Loading** — `isLoading` + `skeletonCount` on `CustomTable`, sized to the page
- **Empty** — a clear "no records found" row; if filters are active, say so and offer to clear them
- **Error** — `getMessageFromError(error)` shown in place, with a retry where sensible
- Show which filters are active and give a way to clear them all

## Before you're done

- [ ] Filters, search, and page live in the URL
- [ ] Page resets to 1 on any filter/search change
- [ ] Search is debounced
- [ ] Every filter param is in the hook's `queryKey`
- [ ] Pagination is server-side
- [ ] `getRowKey` uses a stable id
- [ ] Loading, empty, and error states handled
- [ ] `yarn lint` and `yarn build` pass
