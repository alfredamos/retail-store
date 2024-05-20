import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemState } from "../states/cartItemState";
import { CartItem } from "../validations/cartItemValidation";

const defaultState: CartItemState = {
  cartItems: [],
};

const getCartFromLocalStore = (): CartItemState => {
  const cart = localStorage.getItem("cart");

  return cart ? JSON.parse(cart) : defaultState;
}

const cartItemSlice = createSlice({
  name: "cartItem",
  initialState: getCartFromLocalStore(),
  reducers: {
    addCartItem(state, action: PayloadAction<{cartItem: CartItem}>) {
      state.cartItems.push(action.payload.cartItem);
      
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteCartItem(state, action: PayloadAction<{id: string}>) {
      const filteredCartItem = state.cartItems?.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = filteredCartItem;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    editCartItem(state, action: PayloadAction<{cartItem: CartItem}>) {
      const index = state.cartItems?.findIndex(
        (cartItem) => cartItem.id === action.payload.cartItem.id
      );
      state.cartItems[index] = action.payload.cartItem;

      localStorage.setItem("cart", JSON.stringify(state));
    },    
    getAllCartItems(state, action: PayloadAction<{cartItems: CartItem[]}>) {
      state.cartItems = action.payload.cartItems;      
      
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addCartItem,
  deleteCartItem,
  editCartItem,
  getAllCartItems,
} = cartItemSlice.actions;

export default cartItemSlice.reducer;
