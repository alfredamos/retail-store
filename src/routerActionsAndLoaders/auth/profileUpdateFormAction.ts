import { ActionFunction,redirect } from "react-router-dom";
import { EditProfile } from "../../validations/editProfileValidation";
import { Message } from "../../models/message";
import { profileUpdateService } from "../../APIRoutes/authRoutes";
import { AllState } from "../../states/allState";
import { EnhancedStore } from "@reduxjs/toolkit";

export const profileUpdateFormAction=(store: EnhancedStore<AllState>): ActionFunction => async ({ request }) => {
  const isAdmin = store?.getState()?.auth?.isAdmin;
  const formData = await request.formData();
  const profileUpdateData = Object.fromEntries(formData) as EditProfile;
  console.log({profileUpdateData})
  try {
    (await profileUpdateService.passwordAndProfileUpdate(
      profileUpdateData
    )) as unknown as Message;

    return redirect(`${isAdmin ? "/users" : -1}`);
  } catch (error ) {
    return error;
  }
};
