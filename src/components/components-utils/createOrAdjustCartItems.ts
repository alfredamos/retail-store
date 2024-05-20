import { CartItem } from "../../validations/cartItemValidation";
import { Product } from "../../validations/productValidation";
import { createCartItem } from "./createCartItem";
import { modifiedCartItemQuantity } from "./modifiedCartItemQuantity";

export function createOrAdjustCartItems (cart: CartItem, cartItems: CartItem[], product: Product){
  let cartItemsTemp = [...cartItems];   
  if (cart?.quantity > 0) {
    //----> Modified the cart-item quantity, for existing cart by one.
    const tempCartItems = modifiedCartItemQuantity(cartItems, cart);
    cartItemsTemp = [...tempCartItems];
  } else {
    //----> Cart-item does not exist, then create it.
    const cartItem = createCartItem(product);
    cartItemsTemp = [...cartItems, cartItem];
  } 

  return cartItemsTemp;
}