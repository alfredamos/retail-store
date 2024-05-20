import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartItemSlice";
import customerReducer from "../features/customerSlice";
import orderReducer from "../features/orderSlice";
import productReducer from "../features/productSlice"; 
import userReducer from "../features/userSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    customer: customerReducer,
    order: orderReducer,
    product: productReducer,
    user: userReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;