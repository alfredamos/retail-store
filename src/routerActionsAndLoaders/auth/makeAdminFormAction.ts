import { ActionFunction, redirect } from "react-router-dom";
import { UserRole } from "../../validations/userRoleChangeValidation";
import { userChangeRoleService } from "../../APIRoutes/authRoutes";

export const makeAdminFormAction: ActionFunction =
  async ({ request }) => {
    const formData = await request.formData();
    const userRoleData = Object.fromEntries(formData) as UserRole;

    console.log("In make-admin-form-action, ", {userRoleData})

    const baseURL = location?.pathname?.split('/')[1];
    const nextRoutePicker = baseURL === "users"? "/users" : "/admin-users"
   
    try {
      await userChangeRoleService.passwordAndProfileUpdate(
        userRoleData
      );

      return redirect(nextRoutePicker);
    } catch (error) {
      return error;
    }
  };
