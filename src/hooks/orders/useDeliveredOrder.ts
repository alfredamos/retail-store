import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderDeliveredService } from "../../APIRoutes/orderRoute";
import { OrderModel } from "../../models/OrderModel";

interface Props{
  id: string;
  order: OrderModel;
}


export function useDelivered(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, order}: Props) => orderDeliveredService.update(id, order),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['orders', data.id]})
    },

  },)
}