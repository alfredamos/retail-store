import { toast } from "react-toastify";
import { totalCostAndQuantities } from "../../features/orderSlice";
import { CartItem } from "../../validations/cartItemValidation";
import { Product } from "../../validations/productValidation";
import { createCartItem } from "./createCartItem";
import { initialCart } from "./initialCart";
import { modifiedCartItemQuantity } from "./modifiedCartItemQuantity";
import { OrderProduct } from "../../models/OrderProduct";
import { Dispatch } from "redux";
import React from "react";

export function makeCartItem(
  customerId: string,
  product: Product, 
  cart: CartItem = initialCart,
  cartItems: CartItem[],
  cartItemsTemp: CartItem[],
  orderTemp: OrderProduct,
  order: OrderProduct,
  dispatch: Dispatch,
  setOrder: React.Dispatch<React.SetStateAction<OrderProduct>>,
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
){
  console.log({ cartItems, cart });
  if (cart?.quantity > 0) {
     console.log("In the subsequent cart!!!");
    //----> Modified the cart-item quantity, for existing cart by one.
    const tempCartItems = modifiedCartItemQuantity(cartItems, cart);
    cartItemsTemp = [...tempCartItems];
  } else {
    console.log("In the first cart!!!");    
    //----> Cart-item does not exist, then create it.
    const cartItem = createCartItem(product);
    cartItemsTemp = [...cartItems, cartItem];
  }
  //----> Make a list of cart-items.
  setCartItems(cartItemsTemp);
  orderTemp = { ...order, customerId, cartItems: cartItemsTemp };
  //----> set order state.
  setOrder(orderTemp);
  dispatch(totalCostAndQuantities({ cartItems: cartItemsTemp }));

  toast.success(`The product : ${product.name} has been added successfully!`, {
    position: "top-right",
  });
}
