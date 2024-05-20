import { ActionFunction, redirect } from "react-router-dom";
import { Order } from "../../validations/orderValidation";
import { orderService } from "../../APIRoutes/orderRoute";
import { addOrder } from "../../features/orderSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AllState } from "../../states/allState";
import { OrderProduct } from "../../models/OrderProduct";

export const addOrderFormAction=(store: EnhancedStore<AllState>): ActionFunction => async({request}) => {
  const formData = await request.formData();
  const newOrder = Object.fromEntries(formData) as unknown as Order;

  try {
    const data = await orderService.create(newOrder as OrderProduct);
    store?.dispatch(addOrder({order: data}))

    return redirect("/orders");
    
  } catch (error) {
    return error
  }
}