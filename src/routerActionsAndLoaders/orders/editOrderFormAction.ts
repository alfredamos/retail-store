import { ActionFunction, redirect } from "react-router-dom";
import { Order } from "../../validations/orderValidation";
import { orderService } from "../../APIRoutes/orderRoute";
import { editOrder } from "../../features/orderSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AllState } from "../../states/allState";
import { OrderProduct } from "../../models/OrderProduct";

export const editOrderFormAction =(store: EnhancedStore<AllState>): ActionFunction => async({params, request}) => {
  const id = params.id as string;

  const formData = await request.formData();
  const orderToEdit = Object.fromEntries(formData) as unknown as Order;

  try {
    const data = await orderService.update(id, orderToEdit as OrderProduct);
    store.dispatch(editOrder({order: data}))

    return redirect("/orders");
    
  } catch (error) {
    return error
  }
}