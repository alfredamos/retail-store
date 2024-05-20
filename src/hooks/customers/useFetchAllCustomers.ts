import { useQuery } from "@tanstack/react-query";
import { customerService } from "../../APIRoutes/customerRoute";
import { Customer } from "../../validations/customerValidation";

export function useFetchAllCustomers() {
  return useQuery<Customer[], Error>({
    queryKey: ["Customer"],
    queryFn: () => customerService.getAll(),
  });
}
