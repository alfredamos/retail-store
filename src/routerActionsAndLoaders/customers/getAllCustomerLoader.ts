import { LoaderFunction } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { customersQuery } from "../../queries/customers/customersQuery";
import { getResourcesOrFetchResources } from "../../general/getResourcesOrFetchResources";
import { Customer } from "../../validations/customerValidation";

export const getAllCustomerLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    try {
      const query = customersQuery();

      const customersDb = getResourcesOrFetchResources<Customer[]>(query, queryClient);

      return customersDb;
      // return await queryClient.ensureQueryData(query);
    } catch (error) {
      return error;
    }
  };
