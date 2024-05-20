import { customerService } from "../../APIRoutes/customerRoute";

export const customerOneQuery = (id: string) => ({
  queryKey: ["customers", id],
  queryFn: () => customerService.getOne(id),
});
