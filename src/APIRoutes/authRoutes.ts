import { type AuthResponse } from "../models/authResponse";
import {type CurrentUser } from "../models/currentUser";
import {type Message } from "../models/message";
import { APIAuthService } from "../services/authService";
import { APIService } from "../services/dataService";
import {type  ChangePassword } from "../validations/changePasswordValidation";
import { type EditProfile } from "../validations/editProfileValidation";
import { type Login } from "../validations/loginValidation";
import {type Signup } from "../validations/signupValidation";

export const loginService = new APIAuthService<AuthResponse, Login>("/auth/login");
export const passwordChangeService = new APIAuthService<Message, ChangePassword>("/auth/change-password");
export const profileUpdateService = new APIAuthService<Message, EditProfile>("/auth/edit-profile");
export const signupService = new APIAuthService<AuthResponse, Signup>("/auth/signup");
export const currentUserService = new APIService<CurrentUser>("/auth/current-user");