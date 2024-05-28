import { ActionFunction, redirect } from "react-router-dom";
import { signupService } from "../../APIRoutes/authRoutes";
import { Signup } from "../../validations/signupValidation";
import { getSignupInfo, signup } from "../../features/authSlice";
import { AuthResponse } from "../../models/authResponse";
import { adminSignupNewUser } from "../adminSignupNewUser";
import { AllState } from "../../states/allState";
import { EnhancedStore } from "@reduxjs/toolkit";

export const signupFormAction =
  (store: EnhancedStore<AllState>): ActionFunction =>
  async ({ request }) => {
    const isAdmin = store?.getState()?.auth?.isAdmin;
    const formData = await request.formData();
    const signupData = Object.fromEntries(formData) as unknown as Signup;

    const signupDataWithAdmin = adminSignupNewUser(
      signupData
    ) as unknown as Signup;
    try {
      const response = (await signupService.loginAndSignup(
        signupDataWithAdmin
      )) as AuthResponse;

      store?.dispatch(signup(response));
      store?.dispatch(getSignupInfo({signIn: response.signIn!}))

      console.log({response, signupData})

      return redirect(`${isAdmin ? "/customers/new" : "/signup/new-customer"}`);
    } catch (error) {
      return error;
    }
  };
