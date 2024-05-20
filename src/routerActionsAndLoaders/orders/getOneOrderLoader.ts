import { LoaderFunction } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { orderOneQuery } from "../../../src/queries/orders/orderOneQuery";

export const getOneOrderLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }) => {
    const id = params.id as string;

    try {
      const query = orderOneQuery(id);
      //queryClient.ensureQueryData(query);
       return (
         queryClient.getQueryData(query.queryKey) ??
         (await queryClient.fetchQuery(query))
       );
    } catch (error) {
      return error;
    }
  };
