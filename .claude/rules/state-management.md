# Rule: State Management

Authority: [CODE_REFERENCE.md](../../CODE_REFERENCE.md) §4.

## The split

| Kind of state                                  | Where it goes                                    |
| ---------------------------------------------- | ------------------------------------------------ |
| Anything the backend owns                      | TanStack Query ([api-rules.md](api-rules.md))    |
| Logged-in user, sidebar, cross-module UI state | Zustand (`src/store/`)                           |
| Auth session operations                        | `useAuthStore` (Amplify wrapper)                 |
| Filters, search, pagination                    | URL, via `useQueryParamsState`                   |
| State one component owns and nobody else reads | `useState` in that component                     |

**Single source of truth.** Never mirror store or query data into `useState`. If you need a derived
value, compute it during render.

## Stores

[`src/store/appStore.ts`](../../src/store/appStore.ts) — `useAppStore`:

- `user: IUser | null`, `isLoadingUser`, with `setUser` / `setLoadingUser` / `clearUser`
- `isSidebarCollapsed`, with `toggleSidebar` / `setSidebarCollapsed`
- Wrapped in `persist`, but **only `isSidebarCollapsed` is persisted** — the user is re-derived from
  the Cognito session on load. Don't add the user to the persisted partial; it goes stale against the
  real session and the guards will fight it.

[`src/store/auth/authStore.ts`](../../src/store/auth/authStore.ts) — `useAuthStore`:

- Wraps every Amplify call (sign in, sign out, reset password, …).
- **Does not throw.** Every method resolves `{ success, response?, errorMsg? }`. Branch on `success`;
  don't wrap these in `try/catch` expecting an exception.

## Working with stores

- Keep the `AppState` interface organised by its existing `// User State` / `// UI State` /
  `// User Actions` / `// UI Actions` sections.
- Actions live in the store, not in components. Call `toggleSidebar()`, never
  `set({ isSidebarCollapsed: !isSidebarCollapsed })` from a component.
- **Select narrowly** — `useAppStore((state) => state.user)` — so unrelated updates don't re-render
  the subscriber.
- Don't create a new store for one feature's local UI state. New stores are for state genuinely
  shared across modules. Prop drilling up to 2 levels is fine and preferable to a store nobody else
  reads.

## URL state

[`useQueryParamsState`](../../src/hooks/useQueryParamsState.ts) reads and writes typed query params
with defaults (numbers are coerced; empty/null values are deleted rather than written as blanks).
Use it for anything a user would reasonably bookmark, share, or expect to survive a refresh — which
on a list screen means the filters, the search term, and the page.
