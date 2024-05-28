import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../models/authResponse";
import { AuthState } from "../states/authState";
import { Role } from "../models/role";
import { UserResponse } from "../models/userResponse";

const defaultState: AuthState = {
  currentUser: null!,
  signIn: null!,
  isAdmin: false,
  isLoggedIn: false,
  token: "",
};

const getAuthUserFromLocalStorage = (): AuthState => {
  const auth = localStorage.getItem("auth");

  return auth ? JSON.parse(auth) : defaultState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: getAuthUserFromLocalStorage(),
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.currentUser = action.payload.user!;
      state.signIn = action.payload.signIn!;
      state.isAdmin = action.payload.user?.role === Role.Admin;
      state.isLoggedIn = action.payload.isLoggedIn!;
      state.token = action.payload.token!;

      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: () => {
      localStorage.setItem("auth", JSON.stringify(defaultState));
      
      return defaultState;
    },
    signup(state, action: PayloadAction<AuthResponse>){
      authSlice.caseReducers.login(state, action);
    },
    getSignupInfo(state, action: PayloadAction<{signIn: UserResponse}>){
      state.signIn = action.payload.signIn
    }
   
  },
});

export const { login, logout, signup, getSignupInfo} = authSlice.actions;

export default authSlice.reducer;
