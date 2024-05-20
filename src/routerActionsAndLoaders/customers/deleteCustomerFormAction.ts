import { ActionFunction, redirect } from "react-router-dom";
import { customerService } from "../../APIRoutes/customerRoute";
import { deleteCustomer } from "../../features/customerSlice";
import { StoreAndQClient } from "../../router";

export const deleteCustomerFormAction = ({store, queryClient}:StoreAndQClient): ActionFunction => async({params}) => {
  const id = params.id as string;

  try {
    await customerService.remove(id);
    store.dispatch(deleteCustomer({id}))
    queryClient.invalidateQueries({queryKey: ["customers", id]})
    return redirect("/customers");
    
  } catch (error) {
    return error
  }
}