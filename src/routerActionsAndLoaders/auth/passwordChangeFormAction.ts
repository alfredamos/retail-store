import { ActionFunction, redirect } from "react-router-dom";
import { passwordChangeService } from "../../APIRoutes/authRoutes";
import { ChangePassword } from "../../validations/changePasswordValidation";
import { Message } from "../../models/message";

export const passwordChangeFormAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const passwordChangeData = Object.fromEntries(formData) as ChangePassword
  
  try {
    (await passwordChangeService.passwordAndProfileUpdate(
      passwordChangeData
    )) as unknown as Message;

    return redirect("/home");
  } catch (error ) {
    return error;
  }
};
