import { useEffect, useState } from "react";
import { OrderModel } from "../../models/OrderModel";
import { useGetCustomerId } from "../customers/useGetCustomerId";

export const useGetProfileOrders = (userId: string, orders: OrderModel[]) => {
  const [customerOrders, setCustomerOrders] = useState<OrderModel[]>([]);
  
  const {customerId} = useGetCustomerId(userId);
 

  useEffect(() => {
      const ordersByCustomer = orders?.filter(
        (order) => order.customerId === customerId
      );
      setCustomerOrders(ordersByCustomer);
    
  }, [customerId, orders]);

  return { customerOrders, customerId };
};
