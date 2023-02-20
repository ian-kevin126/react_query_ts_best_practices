import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useHttp } from "../utils/http";
import { Product, ProductParams } from "../types/base";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderKanbanConfig
} from "../utils/use-optimistic-options";
import request from "../utils/request/request";

export function getAllProducts() {
  return request.get<Product[]>("/products");
}

export const useGetProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Product>(
    ["products", { id }],
    () => client(`products/${id}`),
    {
      enabled: Boolean(id)
    }
  );
};

export const useGetProducts = (params?: Partial<ProductParams>) => {
  const client = useHttp();

  return useQuery<Product[]>(["products", params], () =>
    client("products", { data: params })
  );
};

export const useEditProducts = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ProductParams>) =>
      client(`products/${params.id}`, {
        method: "PATCH",
        data: params
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProduct = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<ProductParams>) =>
      client(`products`, {
        data: params,
        method: "POST"
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProduct = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`products/${id}`, {
        method: "DELETE"
      }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  // 要重新排序的item
  fromId: number;
  // 目标item
  referenceId: number;
  // 放在目标item的前面还是后
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (QueryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST"
    });
  }, useReorderKanbanConfig(QueryKey));
};
