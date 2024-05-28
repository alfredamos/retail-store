import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../APIRoutes/productRoute";

export function useDeleteProductById(id: string){
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => productService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products', id]})
    
    } 
      
    
  },
  
)
}