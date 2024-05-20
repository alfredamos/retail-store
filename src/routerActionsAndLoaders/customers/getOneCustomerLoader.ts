import { LoaderFunction } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { customerOneQuery } from "../../queries/customers/customerOneQuery";

export const getOneCustomerLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }) => {
    const id = params.id as string;

    try {
      const query = customerOneQuery(id);
      await queryClient.ensureQueryData(query);
      return query;
    } catch (error) {
      return error;
    }
  };
