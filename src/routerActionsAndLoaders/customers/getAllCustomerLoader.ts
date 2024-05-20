import { LoaderFunction } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { customersQuery } from "../../queries/customers/customersQuery";

export const getAllCustomerLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    try {
      const query = customersQuery();
      return await queryClient.ensureQueryData(query);
    } catch (error) {
      return error;
    }
  };
