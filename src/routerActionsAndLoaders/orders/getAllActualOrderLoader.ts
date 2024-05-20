import { LoaderFunction} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { ordersQuery } from "../../queries/orders/ordersQuery";

export const getAllActualOrderLoader =(queryClient: QueryClient): LoaderFunction => async() => {
  try {
    const query = ordersQuery();
    return queryClient.ensureQueryData(query);
   
  } catch (error) {
    return error
  }
}