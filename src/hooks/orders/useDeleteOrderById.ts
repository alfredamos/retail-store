import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../APIRoutes/orderRoute";

export function useDeleteOrderById(id: string){
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => orderService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['orders', id]})
    
    } 
      
    
  },
  
)
}