import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../models/authResponse";
import { AuthState } from "../states/authState";
import { Role } from "../models/role";

const defaultState: AuthState = {
  currentUser: null!,
  isAdmin: false,
  isLoggedIn: false,
  notLoggedOut: false,
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
      state.notLoggedOut = true

      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.notLoggedOut = false;
      defaultState.notLoggedOut = false;
      localStorage.setItem("auth", JSON.stringify(defaultState));
      
      return defaultState;
    },
    signup(state, action: PayloadAction<AuthResponse>){
      authSlice.caseReducers.login(state, action);
    },
    getLogout(state){
      state.notLoggedOut = false;
    },
    setLogout(state, action: PayloadAction<{value: boolean}>){
      state.notLoggedOut = action.payload.value;
    }
  },
});

export const { login, logout, signup, setLogout, getLogout } = authSlice.actions;

export default authSlice.reducer;
