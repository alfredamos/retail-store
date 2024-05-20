import { orderService } from "../../APIRoutes/orderRoute";

export const orderOneQuery = (id: string) => ({
  queryKey: ["orders"],
  queryFn: () => orderService.getOne(id)
})