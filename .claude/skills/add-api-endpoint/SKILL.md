---
name: add-api-endpoint
description: Use when adding, changing, or debugging a call to the backend API in FinPlan Admin — "add an endpoint", "new API hook", "fetch X from the backend", "call the API", "the list isn't refreshing after save", "stale data after mutation", "add a query key". Covers the src/api/<domain>/ hook contract, queryKeys registration, and cache invalidation.
---

# Add an API endpoint

Every backend call in this repo is a TanStack Query hook under `src/api/<domain>/`. There is no
backend in this repository — this is a client for a separate API.

Read [`.claude/rules/api-rules.md`](../../rules/api-rules.md) for the full contract.
Canonical files to copy from:

- Query: `src/api/leads/useGetAllLeadsApi.ts`
- Mutation: `src/api/leads/useAssignLeads.ts`
- Barrel: `src/api/leads/index.ts`

## Checklist

For every endpoint, all five steps. Skipping step 2 or 5 is what causes the bugs.

1. **Type it** → `src/api/<domain>/<domain>.types.ts`
2. **Register the key** → `src/api/queryKeys.ts`, under the domain's `// Comment` group
3. **Write the hook** → `src/api/<domain>/use<Action><Domain>Api.ts`
4. **Export it** → `src/api/<domain>/index.ts`
5. **Invalidate** → mutations only: every affected key, in the hook's `onSuccess`

If the domain folder doesn't exist, create `index.ts`, `<domain>.types.ts`, and the hook together.

## 1. Types

Type the whole envelope, not just the payload:

```ts
export interface ICourseListItem {
  id: string;
  name: string;
  isActive: boolean;
}

export interface IGetAllCoursesResponse {
  success: boolean;
  data: {
    courses: ICourseListItem[];
    total: number;
  };
}
```

## 2. Query key

```ts
// src/api/queryKeys.ts
  // Courses
  GET_ALL_COURSES: "GET_ALL_COURSES",
  GET_COURSE_BY_ID: "GET_COURSE_BY_ID",
```

Never inline a raw string in a `queryKey`.

## 3a. Query hook

```ts
import AxiosService from "../../config/apiConfig";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import type { IGetAllCoursesResponse } from "./courses.types";

interface IUseGetAllCoursesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface IUseGetAllCoursesParams {
  enabled?: boolean;
  params?: IUseGetAllCoursesQueryParams;
}

const useGetAllCoursesApi = ({
  enabled = true,
  params = {},
}: IUseGetAllCoursesParams = {}) => {
  const { page, limit, search } = params;

  const getAllCourses = async (): Promise<IGetAllCoursesResponse> => {
    try {
      const searchParams = new URLSearchParams();
      if (page !== undefined) searchParams.append("page", page.toString());
      if (limit !== undefined) searchParams.append("limit", limit.toString());
      if (search) searchParams.append("search", search);

      const queryString = searchParams.toString();
      const response = await AxiosService.get<IGetAllCoursesResponse>(
        queryString ? `courses?${queryString}` : `courses`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all courses:", error);
      throw error;
    }
  };

  return useQuery<IGetAllCoursesResponse>({
    queryKey: [queryKeys.GET_ALL_COURSES, page, limit, search],
    enabled,
    queryFn: getAllCourses,
  });
};

export default useGetAllCoursesApi;
```

Rules encoded here:

- Params come in as one optional object with defaults, never positionally.
- **Every value that changes the response must be in the `queryKey`, in destructure order.** Omitting
  one serves stale data when the user changes a filter — the most common bug in this layer.
- Optional filters are appended only when set; `"ALL"` sentinels mean *no filter*, so skip them.
- Thread `enabled` through so callers can defer dependent fetches (`enabled: !!studentId`).
- Relative URL, no leading slash. `AxiosService` supplies the base URL and the Cognito token.

## 3b. Mutation hook

```ts
const useUpdateCourseApi = () => {
  const queryClient = useQueryClient();

  const updateCourse = async ({ id, data }: IUpdateCoursePayload) => {
    try {
      const response = await AxiosService.patch<IUpdateCourseResponse>(`courses/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  };

  return useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_ALL_COURSES] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_COURSE_BY_ID] });
    },
  });
};
```

- **Invalidate in the hook, not the call site.** Ask what this write could have changed: the list, the
  detail, any count or badge endpoint. Miss one and the UI shows stale numbers.
- Invalidate with the bare key so it prefix-matches every paginated/filtered variant.
- **Mutations don't toast.** The component owns feedback.

## 4. Barrel

```ts
export { default as useGetAllCoursesApi } from "./useGetAllCoursesApi";
export { default as useUpdateCourseApi } from "./useUpdateCourseApi";
export * from "./courses.types";
```

## Using it in a component

```tsx
const { data, isLoading, isError, error } = useGetAllCoursesApi({ params: { page, search } });
const { mutateAsync: updateCourse, isPending } = useUpdateCourseApi();

try {
  await updateCourse({ id, data: values });
  toast.success("Course updated");
} catch (err) {
  toast.error(getMessageFromError(err));
}
```

The axios interceptor already toasts 5xx — don't add a second toast for those. 4xx is yours to
surface.

## Before you're done

- `yarn build` (this is the type-check) and `yarn lint` both pass
- The query key contains every param that affects the response
- Every list/detail/count key the mutation touches is invalidated
- No `any`, no `console.log`, no new axios instance, `import type` for type-only imports
