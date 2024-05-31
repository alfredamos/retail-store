import { LoaderFunction} from "react-router-dom";
import { ordersByUserIdService } from "../../APIRoutes/orderRoute";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AllState } from "../../states/allState";

export const getAllCustomerOrderLoader =(store: EnhancedStore<AllState>): LoaderFunction => async() => {
  const {currentUser: {id: userId}} = store.getState().auth
  try {
    const ordersDb = await ordersByUserIdService.getAllById(userId);
      
       return ordersDb;
  } catch (error) {
    return error
  }
}