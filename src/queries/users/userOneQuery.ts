import { userService } from "../../APIRoutes/userRoute";

export const userOneQuery = (id: string) => ({
  queryKey: ["users", id],
  queryFn: () => userService.getOne(id)
});