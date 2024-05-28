import { useAuth } from "../auth/useAuth";
import { Customer } from "../../validations/customerValidation";
import { useFetchAllCustomers } from "./useFetchAllCustomers";
import { useEffect, useState } from "react";
import { OrderProduct } from "../../models/OrderProduct";
import { useOrder } from "../orders/useOrder";

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
  const { data: customers } = useFetchAllCustomers();

  useEffect(() => {
    const customer = customers?.find(
      (customer) => customer?.userId === userId
    ) as Customer;
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
  },[customerId, customers, orders, userId]);

  return { customerId, orderByCustomerId, ordersByCustomerId, orders };
}
