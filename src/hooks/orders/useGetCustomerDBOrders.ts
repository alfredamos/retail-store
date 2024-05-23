import { useEffect, useState } from "react";
import { OrderModel } from "../../models/OrderModel";
import { useAuth } from "../auth/useAuth";
import { useFetchAllCustomers } from "../customers/useFetchAllCustomers";
import { useFetchAllOrders } from "./useFetchAllOrders";

export function useGetCustomerDBOrders(){
  const [customerId, setCustomerId] = useState("")
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const {currentUser: {id: userId}} = useAuth();
  const {data: customers} = useFetchAllCustomers();
  const {data: ordersDb} = useFetchAllOrders();
  
  useEffect(() => {
    const idOfCustomer = customers?.find(customer => customer.userId === userId)?.id as string;
    setCustomerId(idOfCustomer);
    const ordersByCustomerId = ordersDb?.filter(order => order.customerId === customerId) as OrderModel[];
    setOrders(ordersByCustomerId);
  
  },[customerId, customers, ordersDb, userId]);

  return {customerId, orders}
}