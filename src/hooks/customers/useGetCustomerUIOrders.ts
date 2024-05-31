import { useAuth } from "../auth/useAuth";
import { useEffect, useState } from "react";
import { OrderProduct } from "../../models/OrderProduct";
import { useOrder } from "../orders/useOrder";
import { useGetCustomerByUserId } from "./useGetCustomerByUserId";

export function useGetCustomerUIOrders() {
  const [customerId, setCustomerId] = useState("");
  const [orderByCustomerId, setOrderByCustomerId] = useState<OrderProduct>({
    customerId: "",
    cartItems: [],
  });
  const [ordersByCustomerId, setOrdersByCustomerId] = useState<OrderProduct[]>(
    []
  );
  //----> Get the current-user.
  const orders = useOrder()?.orders;
  const {
    currentUser: { id: userId },
  } = useAuth();

  //----> Get the current customer;
  const {data: customer} = useGetCustomerByUserId(userId)

  useEffect(() => {
    
    const idOfCustomer = customer?.id as string;
    setCustomerId(idOfCustomer);

    const ordersByCustomer = orders?.filter(
      (order) => order.customerId === customerId
    ) as OrderProduct[];

    setOrdersByCustomerId(ordersByCustomer);
    const orderByCustomer = orders?.find(
      (order) => order.customerId === customerId
    ) as OrderProduct;
    setOrderByCustomerId(orderByCustomer);
  },[customerId, customer, orders, userId]);

  return { customerId, orderByCustomerId, ordersByCustomerId, orders };
}
