import { ActionFunction, redirect} from "react-router-dom";
import { userService } from "../../APIRoutes/userRoute";
import { deleteUser } from "../../features/userSlice";
import { StoreAndQClient } from "../../router";

export const userDeleteFormAction = ({store, queryClient}: StoreAndQClient) :ActionFunction => async ({ params }) => {
  try {
    const id = params.id as string;
    console.log("In user-delete-form")
    await userService.remove(id);
    store.dispatch(deleteUser({id}));
    queryClient.invalidateQueries({queryKey: ["users", id]})
    return redirect("/users");
  } catch (error: unknown) {
    return error;
  }
};
