import { LoaderFunction } from "react-router-dom";
import { AllState } from "../../states/allState";
import { EnhancedStore } from "@reduxjs/toolkit";

export const currentUserLoader=(store: EnhancedStore<AllState>): LoaderFunction => async () => {
  
  try {
    const currentUser = store.getState()?.auth?.currentUser;
    console.log({currentUser})
    return currentUser;
  } catch (error ) {
    return error;
  }
};
