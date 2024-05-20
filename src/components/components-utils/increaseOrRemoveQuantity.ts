import { totalCostAndQuantities, clearOrder, clearTotalCostAndQuantities, addOrder } from "../../features/orderSlice";
import { OrderProduct } from "../../models/OrderProduct";
import { CartItem } from "../../validations/cartItemValidation";
import { sumOfQuantitiesAndSumOfCosts } from "./sumOfQuantitiesAndSumOfCosts";
import { Dispatch } from "redux";

export const quantityAdjustmentOrRemoval = (
  carts: CartItem[],
  dispatch: Dispatch,
  customerId: string,
  setCarts: React.Dispatch<React.SetStateAction<CartItem[]>>,
  setQuantities: React.Dispatch<React.SetStateAction<number>>,
  setTotalCost: React.Dispatch<React.SetStateAction<number>>,
  setOrderCart: React.Dispatch<React.SetStateAction<OrderProduct>>
) => {
  //----> Modified the cart-items.
  setCarts(carts);
  //----> Update the quantities and total-cost.
  const { sumOfCosts, sumOfQuantities } = sumOfQuantitiesAndSumOfCosts(carts);
  setQuantities(sumOfQuantities); //----> Update the quantities.
  setTotalCost(sumOfCosts); //----> Update the total-cost
  dispatch(totalCostAndQuantities({ cartItems: carts })); //----> Adjust the totalPrice and quantities.
  //----> Check for empty cart.
  if (!carts.length) {
    dispatch(clearOrder());
    dispatch(clearTotalCostAndQuantities());
    return;
  }
  //----> Reflect the change in the order.
  const orderCartTemp: OrderProduct = { customerId, cartItems: carts };
  setOrderCart(orderCartTemp); //----> Modified the cart order.
  dispatch(addOrder({ order: orderCartTemp })); //----> Replace with new order.
};