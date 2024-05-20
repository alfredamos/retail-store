import { CartItem } from "../../validations/cartItemValidation";

export const sumOfQuantitiesAndSumOfCosts = (cartItems: CartItem[]) => {
  const sumOfQuantities = cartItems?.reduce(
    (accum, current) => accum + current.quantity,
    0
  );
  const sumOfCosts = cartItems?.reduce(
    (accum, current) => accum + current.quantity * current.price,
    0
  );

  return { sumOfCosts, sumOfQuantities };
};
