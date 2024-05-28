import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../APIRoutes/userRoute";

export function useDeleteUserById(id: string){
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => userService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users', id]})
    
    } 
      
    
  },
  
)
}