import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../APIRoutes/orderRoute";

export function useDeleteAllOrdersByCustomerId(customerId: string){
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => orderService.remove(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['orders', customerId]})
    
    } 
      
    
  },
  
)
}