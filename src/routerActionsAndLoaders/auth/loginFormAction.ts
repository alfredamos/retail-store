//import  {ht} from "http-errors"
import store from "../../store";
import { login } from "../../features/authSlice";
import { ActionFunction, redirect } from "react-router-dom";
import { loginService } from "../../APIRoutes/authRoutes";
import { AuthResponse } from "../../models/authResponse";
import { Login } from "../../validations/loginValidation";

export const loginFormAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const loginData = Object.fromEntries(formData) as Login;
  console.log("In router-form", {loginData})
  try {
    const response = (await loginService.loginAndSignup(
      loginData
    )) as AuthResponse;

    store.dispatch(login(response));
    return redirect("/products");
  } catch (error ) {
    return error;
  }
};
