import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../APIRoutes/orderRoute";

export function useFetchAllOrders(){
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.getAll(),
  })
}