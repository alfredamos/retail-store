import { LoaderFunction } from "react-router-dom";
import { productOneQuery } from "../../queries/products/productOneQuery";
import { QueryClient } from "@tanstack/react-query";


export const getOneProductLoader = (queryClient: QueryClient): LoaderFunction => async({params}) => {
  const id = params.id as string;
  console.log({id})
  
  try {
    const query = productOneQuery(id);
    queryClient.ensureQueryData(query);
    return query
  } catch (error) {
    return error;
  }
}