import { useQuery } from "@tanstack/react-query";
import { customerService } from "../../APIRoutes/customerRoute";
import { Customer } from "../../validations/customerValidation";

export function useFetchOneCustomer(id: string) {
  return useQuery<Customer, Error>({
    queryKey: ["Customer", id],
    queryFn: () => customerService.getOne(id),
  });
}
