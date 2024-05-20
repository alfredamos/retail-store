import { CartItem } from "../../validations/cartItemValidation";

export const modifiedCartItemQuantity = (cartItems: CartItem[], cart: CartItem) => {
  console.log({ cart });
  //----> Increase the cart-item by one.
  const quantity = cart.quantity + 1;
  cart = { ...cart, quantity: quantity };
  return cartItems?.map((cartItem) =>
    cartItem.quantity > 0 && cartItem.productId === cart.productId
      ? cart
      : cartItem
  );
};
