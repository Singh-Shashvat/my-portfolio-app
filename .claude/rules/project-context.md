# Rule: Project Context

This project is **FinPlan Admin** (`finplan-admin-fe`) — an internal admin dashboard for a
financial-education / student-financing platform.

It is a **client-only SPA**. There is no backend in this repository, no database, no ORM, no server
rendering, and no public-facing marketing site. All data comes from a separate backend API.

## Stack (immutable — see CODE_REFERENCE.md §1)

React 19 · TypeScript 5.9 (strict) · Vite 7 · React Router DOM 7 (`BrowserRouter`) ·
TanStack Query v5 · Zustand v5 · AWS Amplify v6 (Cognito) · Axios · **Formik + Zod**
(`zod-formik-adapter`) · Tailwind CSS v4 · shadcn/ui (Radix) · lucide-react · recharts · sonner

**This is not a Next.js app.** There are no Server Components, no App Router, no Route Handlers, no
`next/image`, no server actions, no `use server`. If a suggestion depends on any of those, it does
not apply here.

`react-hook-form` appears in `package.json` but has **zero usages** — a stray dependency, not the
project's form library. Use Formik.

## Who uses it

Staff only. Every user is authenticated through Cognito and carries a role from `USER_ROLES`:
`ADMIN`, `TEAM_LEADER`, `COUNSELLOR`, `LOAN_DEPARTMENT`, `FEE_DEPARTMENT`.

There is no public or anonymous surface. Every screen sits behind `AuthenticatedRoute`, and nearly
all sit behind a `RoleProtectedRoute` as well.

## Core domains

`src/modules/` — `leads`, `courses`, `coursePayment`, `applicationFee`, `nbfcLoan`, `schemes`,
`coupons`, `team`, `dashboard`, `profile`, `auth`, `authLoading`.

`src/api/` — `leads`, `courses`, `coursePayments`, `applicationFees`, `applications`, `documents`,
`examsResults`, `interview`, `internalLoan`, `nbfcLoan`, `nbfcEmiPlans`, `coupons`, `finplanUsers`,
`dashboard`.

The central workflow is the student pipeline: **lead → application → exam/interview → course
payment → loan (internal or NBFC)**, with the fee and loan departments picking up later stages.

## Priorities

This is an internal operations tool. Optimise for **speed of use, data density, correctness, and
clarity** — not for marketing polish, hero animations, or conversion rate. Staff use these screens
all day. Scannable tables, honest loading/empty/error states, and fast filtering matter far more
than visual flourish.

## The law

[CODE_REFERENCE.md](../../CODE_REFERENCE.md) is the enforced engineering standard.
[CLAUDE.md](../../CLAUDE.md) is the quick map. Read both before non-trivial work.
