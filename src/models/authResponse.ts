import { UserResponse } from "./userResponse";

export class AuthResponse { 
  user?: UserResponse;
  token?: string;
  isLoggedIn?: boolean;
}