import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderModel } from "../../models/OrderModel";
import { orderShippedService } from "../../APIRoutes/orderRoute";

interface Props {
  id: string;
  order: OrderModel;
}

export function useShipped() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, order }: Props) => orderShippedService.update(id, order),
    onSuccess: (data) => {     
      queryClient.invalidateQueries({ queryKey: ["orders", data.id] });
    },
  });
}
