import { Dispatch } from "redux";
import { CartItem } from "../../validations/cartItemValidation";
import { clearOrder, addOrder, totalCostAndQuantities, findOrderByCustomerId } from "../../features/orderSlice";
import { OrderProduct } from "../../models/OrderProduct";

export const cartAndCheckoutMaker = (
  carts: CartItem[],
  cartItems: CartItem[],
  customerId: string,
  dispatch: Dispatch,
  orderTemp: OrderProduct,
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
  setOrder: React.Dispatch<React.SetStateAction<OrderProduct>>
) => {
  dispatch(clearOrder()); //----> Clear the previous order

  setCartItems(carts); //----> Register the selected cart-items

  orderTemp = { customerId, cartItems }; //---> The updated order.
  console.log({ orderTemp, customerId });
  setOrder(orderTemp); //----> Register the current order selected.

  dispatch(addOrder({ order: orderTemp })); //----> store the current selected order in redux store.

  dispatch(totalCostAndQuantities({ cartItems: carts }));

  dispatch(findOrderByCustomerId({ customerId })); //----> Latest order.
};
