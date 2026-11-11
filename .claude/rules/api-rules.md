# Rule: API & Data Layer

> Replaces the old `backend-rules.md`. **There is no backend, database, ORM, object storage, or
> email service in this repository.** This repo is a client that talks to a separate backend API.
> Drizzle, Neon, Postgres, R2, Resend, and Route Handlers are not part of this project.

Authority: [CODE_REFERENCE.md](../../CODE_REFERENCE.md) §4, §5.
Canonical examples: [`useGetAllLeadsApi.ts`](../../src/api/leads/useGetAllLeadsApi.ts) (query),
[`useAssignLeads.ts`](../../src/api/leads/useAssignLeads.ts) (mutation).

## Non-negotiables

- **One endpoint = one hook file** at `src/api/<domain>/use<Action><Domain>Api.ts`, default-exported
  and re-exported from that domain's `index.ts` barrel.
- **All HTTP goes through the axios singleton** [`src/config/apiConfig.ts`](../../src/config/apiConfig.ts),
  imported as `AxiosService`. Never `axios.create()`, never bare `fetch`. The request interceptor
  attaches the Cognito bearer token via `fetchAuthSession()`; a fresh instance silently loses auth.
- **Every query-key string is registered in [`src/api/queryKeys.ts`](../../src/api/queryKeys.ts)**
  under its `// Domain` comment. Never inline a raw string into a `queryKey`.
- **Server data lives only in React Query.** No `useState` copy, no stashing it in Zustand.
- URLs are relative (`AxiosService.get("leads")`) — no leading slash, never a hardcoded host. Base
  URL comes from `config` in [`src/config/env.config.ts`](../../src/config/env.config.ts).

## Query hook shape

```ts
const useGetAllLeadsApi = ({ enabled = true, params = {} }: IUseGetAllLeadsParams = {}) => {
  const { page, limit, search, status } = params;

  const getAllLeads = async (): Promise<IGetAllLeadsResponse> => {
    try {
      const searchParams = new URLSearchParams();
      if (page !== undefined) searchParams.append("page", page.toString());
      if (search) searchParams.append("search", search);
      if (status && status !== LeadStatusEnum.ALL) searchParams.append("status", status);

      const queryString = searchParams.toString();
      const response = await AxiosService.get<IGetAllLeadsResponse>(
        queryString ? `leads?${queryString}` : `leads`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all leads:", error);
      throw error;
    }
  };

  return useQuery<IGetAllLeadsResponse>({
    queryKey: [queryKeys.GET_ALL_LEADS, page, limit, search, status],
    enabled,
    queryFn: getAllLeads,
  });
};
```

Spelled out:

- Params arrive as one optional object with defaults, never positionally.
- **Every value that changes the response must be in the `queryKey`.** Omitting one serves stale data
  across filter changes — the most common bug in this layer.
- Optional filters are appended only when set. `"ALL"` sentinels mean *no filter* — skip them, don't
  send them.
- Thread `enabled` through so callers can defer dependent fetches.

## Mutation hook shape

```ts
return useMutation({
  mutationFn: assignLeads,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.GET_ALL_LEADS] });
    queryClient.invalidateQueries({ queryKey: [queryKeys.GET_LEAD_STATUS_COUNTS] });
  },
});
```

- **Invalidate inside the hook's `onSuccess`, not at the call site.** Invalidate every list, detail,
  and count key the write could have touched — assigning a lead changes the list *and* the status
  counts; missing the second leaves a stale badge on screen.
- Invalidate with the bare key so it prefix-matches all paginated/filtered variants.
- Mutations don't toast. The component owns user feedback — see [code-quality-rules.md](code-quality-rules.md).

## Types & the response envelope

Domain types live in `src/api/<domain>/<domain>.types.ts` and are exported through the barrel
(`export * from "./leads.types"`).

The API wraps responses as `{ success: boolean; data: T; ... }`. Type the envelope, not just the
payload, and check `success === false || !data` before trusting it — that is what the auth guards do.

## Errors

- 5xx is toasted globally by the axios response interceptor. **Do not add a second toast for 5xx.**
- 4xx is the component's job: catch it and render `getMessageFromError(error)`.
- `console.error` inside a `queryFn`/`mutationFn` catch is the established convention here (~42
  occurrences in `src/api/`) — keep it, and always **re-throw** so React Query still enters its error
  state. `console.log` is prohibited; there are currently zero in `src/`.

## Security notes that do apply

- Secrets never live in this repo. All config is `VITE_*`, Zod-validated at startup in
  `env.config.ts`, and **anything `VITE_*` ships to the browser** — never put a real secret there.
- Never trust client-side validation for authorisation. Route-level role gating
  ([routing-and-roles.md](routing-and-roles.md)) is a UX affordance; the backend is the real
  enforcement point.
- Confirm destructive actions in the UI with `ConfirmModal` / `ConfirmationModal`.
