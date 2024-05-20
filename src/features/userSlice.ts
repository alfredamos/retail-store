import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../states/userState";
import { User } from "../validations/userValidation";

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<{user: User}>) {
      state.users.push(action.payload.user);

      localStorage.setItem("user", JSON.stringify(state));
    },
    deleteUser(state, action: PayloadAction<{id: string}>) {
      const filteredUser = state.users?.filter(
        (user) => user.id !== action.payload.id
      );
      state.users = filteredUser;

      localStorage.setItem("user", JSON.stringify(state));
    },
    editUser(state, action: PayloadAction<{user: User}>) {
      const index = state.users?.findIndex(
        (user) => user.id === action.payload.user.id
      );
      state.users[index] = action.payload.user;

      localStorage.setItem("user", JSON.stringify(state));
    },
    getAllUsers(state, action: PayloadAction<{users: User[]}>) {
      state.users = action.payload.users;

      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { addUser, deleteUser, editUser, getAllUsers } =
  userSlice.actions;

export default userSlice.reducer;
