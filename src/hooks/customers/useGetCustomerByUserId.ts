import { useQuery } from "@tanstack/react-query";
import { customerByUserIdService } from "../../APIRoutes/customerRoute";

export function useGetCustomerByUserId(userId: string){
  return useQuery({
    queryKey: ["customers", userId],
    queryFn: () => customerByUserIdService.getOne(userId),
  });
}