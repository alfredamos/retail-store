import { useEffect, useState } from "react";
import { CartItem } from "../../validations/cartItemValidation";
import { OrderProduct } from "../../models/OrderProduct";

export function useGetOrderAndCartItems(
  orders: OrderProduct[],
  customerId: string
) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<OrderProduct>({
    customerId: "",
    cartItems: [],
  });

  useEffect(() => {
    const orderByCustomerId = orders?.find(
      (ord) => ord.customerId === customerId
    );

    const carts = orderByCustomerId?.cartItems;

    setOrder(
      (orderByCustomerId as OrderProduct) || { customerId: "", cartItems: [] }
    );
    setCartItems((carts as CartItem[]) || []);
  }, [customerId, orders]);

  return { cartItems, order, setCartItems, setOrder };
}
