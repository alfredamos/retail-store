import { customerService } from "../../APIRoutes/customerRoute";

export const customersQuery = () => ({
  queryKey: ["customers"],
  queryFn: () => customerService.getAll(),
});
