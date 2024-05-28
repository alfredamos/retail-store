import { LoaderFunction } from "react-router-dom";
import { AllState } from "../../states/allState";
import { EnhancedStore } from "@reduxjs/toolkit";

export const addCustomerLoader=(store: EnhancedStore<AllState>): LoaderFunction => async () => {
  
  try {
    const signupUserInfo = store.getState()?.auth?.signIn;
    console.log({signupUserInfo})
    return signupUserInfo;
  } catch (error ) {
    return error;
  }
};
