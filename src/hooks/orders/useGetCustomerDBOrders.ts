import { useEffect, useState } from "react";
import { OrderModel } from "../../models/OrderModel";
import { useAuth } from "../auth/useAuth";
import { useFetchAllCustomers } from "../customers/useFetchAllCustomers";
import { useFetchAllOrders } from "./useFetchAllOrders";

export const useGetCustomerDBOrders =()=>{
  const [customerId, setCustomerId] = useState("")
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const {currentUser} = useAuth();
  const {data: customers} = useFetchAllCustomers();
  const {data: ordersDb} = useFetchAllOrders();
  console.log("In use-get-customerDb-orders", {ordersDb})
  useEffect(() => {
    
    const idOfCustomer = customers?.find(customer => customer.userId === currentUser?.id)?.id as string;
    setCustomerId(idOfCustomer);
    const ordersByCustomerId = ordersDb ? ordersDb?.filter(order => order.customerId === customerId) as OrderModel[] : [];
    setOrders(ordersByCustomerId);
  
    
  
  },[customerId, customers, ordersDb, currentUser]);

  return {currentUser, customerId, orders}
}