import { CartItem } from "../../validations/cartItemValidation";

export const increaseOrDecreaseCartQuantity = (
  operation: string,
  carts: CartItem[],
  productId: string
) => {
  const opera: number = operation === "increaseQuantity" ? 1 : -1;

  const newCartItems = carts
    ?.map((cart) => {
      if (cart.productId === productId && opera === 1) {
        //----> Increase the cart-item quantity by one.
        console.log("i'm increasing the quantity by one!");
        const quantity = cart.quantity;
        return { ...cart, quantity: quantity + 1 };
      }
      if (cart.productId === productId && opera === -1) {
        //----> Reduce the cart-item quantity by one
        console.log("i'm decreasing the quantity by one!");
        const quantity = cart.quantity;
        return { ...cart, quantity: quantity - 1 };
      }
      //----> Leave the quantity the same.
      return cart;
    })
    .filter((cat) => cat.quantity !== 0);

  return newCartItems; //----> Return the modified cart-items.
};
