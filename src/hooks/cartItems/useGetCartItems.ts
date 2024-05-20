import { useEffect, useState } from "react";
import { OrderModel } from "../../models/orderModel";
import { CartItem } from "../../validations/cartItemValidation";

export function useGetCartItems(order: OrderModel){
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (order){
      setCartItems(order.cartItems);
    }
  },[order])

  return {cartItems}
} 