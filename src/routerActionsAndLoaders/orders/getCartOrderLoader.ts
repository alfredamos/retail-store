import {LoaderFunction} from "react-router-dom"
import { EnhancedStore } from "@reduxjs/toolkit";
import { AllState } from "../../states/allState";


export const getCartOrderLoader=(store: EnhancedStore<AllState>): LoaderFunction => async () => {
  const {auth, order} = store.getState(); //----> Get auth, order from the store.
  
  const {currentUser: { name}} = auth; //----> Use the auth key of the reducer to get the user id.

  const {order: cartOrder, customerId, totalCost, quantities} = order; //----> Use the order key of the reducer to get all orders.

  try {
    if (!cartOrder) throw new Error("Cart order is empty!");

    return {order: cartOrder, customerId, name, quantities, totalCost};
  } catch (error) {
    return error;
  }
};