import { useQuery, UseQueryResult } from "@tanstack/react-query";

import type { UseQueryOptions } from "@tanstack/react-query";
import {
  APIMetadataPagination,
  ErrorResponse,
  Indicator,
  PaginationMetadata,
  Task
} from "../types";
import apiService from "../utils/apiService";

const DEFAULT_QUERY_OPTIONS = {
  retry: false,
  keepPreviousData: true,
  refetchOnWindowFocus: false
};

type ResponseData = { data: Indicator[]; meta: PaginationMetadata };

export const useIndicators = <T = ResponseData>(
  queryParams: Record<string, unknown> = {},
  options: UseQueryOptions<ResponseData, unknown, T, ["indicators"]> = {}
) => {
  return useQuery(
    ["indicators", queryParams],
    () =>
      apiService
        .request<ResponseData>({
          method: "GET",
          url: "/indicators",
          params: queryParams
        })
        .then(({ data }) => data),
    {
      ...DEFAULT_QUERY_OPTIONS,
      placeholderData: { data: [], meta: {} },
      ...options
    }
  );
};

export const useIndicator = <T = Indicator>(
  id: Indicator["id"],
  options?: UseQueryOptions<Indicator, unknown, T, ["indicators", typeof id]>
) => {
  const enabled = (options?.enabled ?? true) && !!id && id !== "all";
  const query = useQuery(
    ["indicators", id],
    () =>
      apiService
        .request<{ data: Indicator }>({
          method: "GET",
          url: `/indicators/${id}`,
          params: { include: "unit" }
        })
        .then(({ data: responseData }) => responseData.data),
    {
      ...DEFAULT_QUERY_OPTIONS,
      ...options,
      enabled
    }
  );

  return query;
};

type TaskAPIResponse = Task;

type TasksAPIResponse = {
  data: Task[];
  meta: APIMetadataPagination;
};

export const useTasks = <T = TasksAPIResponse>(
  params: Record<string, string | number | boolean> = {},
  options: UseQueryOptions<
    TasksAPIResponse,
    ErrorResponse,
    T,
    ["tasks", typeof params]
  > = {}
) => {
  const query = useQuery(
    ["tasks", params],
    () =>
      apiService
        .request<{ data: TasksAPIResponse }>({
          method: "GET",
          url: "/tasks",
          params
        })
        .then(({ data: responseData }) => responseData.data),
    {
      ...DEFAULT_QUERY_OPTIONS,
      ...options
    }
  );

  return query;
};

export function useTask(
  id: Task["id"],
  options: UseQueryOptions<TaskAPIResponse> = {}
): UseQueryResult<TaskAPIResponse> {
  const query = useQuery<TaskAPIResponse>(
    ["tasks", id],
    () =>
      apiService
        .request({
          method: "GET",
          url: `/tasks/${id}`
        })
        .then(({ data: responseData }) => responseData.data),
    {
      ...DEFAULT_QUERY_OPTIONS,
      ...options
    }
  );

  return query;
}
