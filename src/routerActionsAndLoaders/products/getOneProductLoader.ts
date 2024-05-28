import { LoaderFunction } from "react-router-dom";
import { productOneQuery } from "../../queries/products/productOneQuery";
import { QueryClient } from "@tanstack/react-query";
import { getResourcesOrFetchResources } from "../../general/getResourcesOrFetchResources";
import { Product } from "../../validations/productValidation";


export const getOneProductLoader = (queryClient: QueryClient): LoaderFunction => async({params}) => {
  const id = params.id as string;
  console.log({id})
  
  try {
    const query = productOneQuery(id);
    const productDb = getResourcesOrFetchResources<Product>(
      query,
      queryClient
    );

    return productDb;
  } catch (error) {
    return error;
  }
}