import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { OrderProduct } from "../../models/OrderProduct";
import { AxiosError } from "axios";
import { addOrder } from "../../features/orderSlice";
import { orderService } from "../../APIRoutes/orderRoute";


export const useAddOrder = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<OrderProduct, Error, OrderProduct, OrderProduct>({
    // mutationFn: (order) => axios.post(`${baseUrl}/orders`, order),
    mutationFn: (order) => orderService.create(order),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      dispatch(addOrder({ order: data }));
    },
    onError: (error) => {
      const errorM = error as AxiosError;
      console.log("in useAddOrder, errorMessage", errorM.config);
    },
  });
};
