import { ActionFunction, redirect } from "react-router-dom";
import { Customer } from "../../validations/customerValidation";
import { customerService } from "../../APIRoutes/customerRoute";
import { addCustomer } from "../../features/customerSlice";
import { StoreAndQClient } from "../../router";

export const addCustomerFormAction = ({store, queryClient}: StoreAndQClient):ActionFunction => async({request}): Promise<Response | Error> => {
  const formData = await request.formData();
  const newCustomer = Object.fromEntries(formData) as unknown as Customer;
  console.log("add-customer, customer : ", newCustomer);
  
  const currentUser = store?.getState()?.auth?.currentUser;
  const isAdmin = currentUser?.role === "Admin";
  console.log({isAdmin})

  try {
   const data = await customerService.create(newCustomer);
    store?.dispatch(addCustomer({customer: data}));
    queryClient?.invalidateQueries({queryKey: ["Customers"]})
    return redirect(`${isAdmin ? "/admin-customers": `/profiles/${currentUser?.id}`}`); 
    
  } catch (error: unknown) {
    return error as Error
  }
}