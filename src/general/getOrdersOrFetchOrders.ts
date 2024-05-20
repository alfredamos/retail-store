import { QueryClient } from "@tanstack/react-query";
import { OrderProduct } from "../models/OrderProduct";

type Query = {
  queryKey: string[],
  queryFn: () => Promise<OrderProduct[]>;
}

export async function getOrdersOrFetchOrders(query: Query, queryClient: QueryClient){
 return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query)))
}


