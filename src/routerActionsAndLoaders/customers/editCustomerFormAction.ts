import { ActionFunction, redirect } from "react-router-dom";
import { Customer } from "../../validations/customerValidation";
import { customerService } from "../../APIRoutes/customerRoute";
import { editCustomer } from "../../features/customerSlice";
import { StoreAndQClient } from "../../router";

export const editCustomerFormAction = ({store, queryClient}: StoreAndQClient): ActionFunction => async({params, request}) => {
  const id = params.id as string;

  const formData = await request.formData();
  const customerToEdit = Object.fromEntries(formData) as unknown as Customer;
  const currentUser = store.getState()?.auth?.currentUser;
  const isAdmin = currentUser?.role === "Admin";
  try {
    const data = await customerService.update(id, customerToEdit);
    console.log({data})
    store.dispatch(editCustomer({customer: data}))
    queryClient.invalidateQueries({queryKey: ["customers", id]})
    return redirect(
      `${isAdmin ? "/admin-customers" : `/profiles/${currentUser?.id}`}`
    );
    
  } catch (error) {
    return error
  }
}