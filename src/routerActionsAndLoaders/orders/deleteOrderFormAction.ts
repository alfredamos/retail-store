import { ActionFunction, redirect } from "react-router-dom";
import { orderService } from "../../APIRoutes/orderRoute";
import { deleteOrder } from "../../features/orderSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AllState } from "../../states/allState";

export const deleteOrderFormAction=(store: EnhancedStore<AllState>): ActionFunction => async({params}) => {
  const id = params.id as string;

  try {
    await orderService.remove(id);
    store.dispatch(deleteOrder({id}))

    return redirect("/orders");
    
  } catch (error) {
    return error
  }
}