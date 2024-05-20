import { userService } from "../../APIRoutes/userRoute";

export const usersQuery = () => ({
  queryKey: ["users"],
  queryFn: () => userService.getAll(),
});