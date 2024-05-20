import { ActionFunction, redirect } from "react-router-dom";
import { Customer } from "../../validations/customerValidation";
import { customerService } from "../../APIRoutes/customerRoute";
import { addCustomer } from "../../features/customerSlice";
import { StoreAndQClient } from "../../router";

export const addCustomerFormAction = ({store, queryClient}: StoreAndQClient):ActionFunction => async({request}): Promise<Response | Error> => {
  const formData = await request.formData();
  const newCustomer = Object.fromEntries(formData) as unknown as Customer;
  console.log("add-customer, customer : ", newCustomer);
  try {
   const data = await customerService.create(newCustomer);
    store?.dispatch(addCustomer({customer: data}));
    queryClient?.invalidateQueries({queryKey: ["Customers"]})
    return redirect("/products"); 
    
  } catch (error: unknown) {
    return error as Error
  }
}