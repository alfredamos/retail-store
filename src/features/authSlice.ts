import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../models/authResponse";
import { AuthState } from "../states/authState";
import { Role } from "../models/role";

const defaultState: AuthState = {
  currentUser: null!,
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
    }
  },
});

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
