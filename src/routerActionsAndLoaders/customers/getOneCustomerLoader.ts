import { LoaderFunction } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { customerOneQuery } from "../../queries/customers/customerOneQuery";
import { getResourcesOrFetchResources } from "../../general/getResourcesOrFetchResources";
import { Customer } from "../../validations/customerValidation";

export const getOneCustomerLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }) => {
    const id = params.id as string;

    try {
      const query = customerOneQuery(id);
      const customerDb = getResourcesOrFetchResources<Customer>(
        query,
        queryClient
      );

      return customerDb
     
    } catch (error) {
      return error;
    }
  };
