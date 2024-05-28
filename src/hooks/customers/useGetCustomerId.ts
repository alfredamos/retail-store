import { useEffect, useState } from "react";
import { useFetchAllCustomers } from "./useFetchAllCustomers";

export function useGetCustomerId(userId: string){
  const [customerId, setCustomerId] = useState("");
  const {data: customers} = useFetchAllCustomers();

  useEffect(() => {
    const customerId = customers?.find(customer => customer.userId === userId)?.id as string;
    setCustomerId(customerId);
  },[customers, userId]);

  return {customerId};
}