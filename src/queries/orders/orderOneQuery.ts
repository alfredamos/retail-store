import { orderService } from "../../APIRoutes/orderRoute";

export const orderOneQuery = (id: string) => ({
  queryKey: ["orders", id],
  queryFn: () => orderService.getOne(id)
})