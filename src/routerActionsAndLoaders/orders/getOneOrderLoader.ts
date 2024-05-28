import { LoaderFunction } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { orderOneQuery } from "../../../src/queries/orders/orderOneQuery";
import { getResourcesOrFetchResources } from "../../general/getResourcesOrFetchResources";
import { OrderProduct } from "../../models/OrderProduct";

export const getOneOrderLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }) => {
    const id = params.id as string;

    try {
      const query = orderOneQuery(id);
      //queryClient.ensureQueryData(query);
       const orderDb = await getResourcesOrFetchResources<OrderProduct>(
         query,
         queryClient
       );
       console.log("In order-one-loader : ", orderDb)
       return orderDb;
    } catch (error) {
      return error;
    }
  };
