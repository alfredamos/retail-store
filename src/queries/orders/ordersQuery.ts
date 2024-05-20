import { orderService } from "../../APIRoutes/orderRoute";

export const ordersQuery = () => ({
  queryKey: ["orders"],
  queryFn: () => orderService.getAll()
})