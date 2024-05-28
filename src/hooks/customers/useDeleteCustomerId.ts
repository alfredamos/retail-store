import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {deleteCustomer} from "../../features/customerSlice"
import { customerService } from "../../APIRoutes/customerRoute";
import { AxiosError } from "axios";

export function useDeleteCustomer(id: string){
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => customerService.remove(id),
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["customers", id] });
      dispatch(deleteCustomer({id}))
    },
    onError: (error) => {
       const errorM = error as AxiosError;
       console.log("in useAddOrder, errorMessage", errorM.config);
    } 
  });
}