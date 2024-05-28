import { LoaderFunction } from "react-router-dom";
import { productsQuery } from "../../queries/products/productsQuery";
import { QueryClient } from "@tanstack/react-query";
import { Product } from "../../validations/productValidation";
import { getResourcesOrFetchResources } from "../../general/getResourcesOrFetchResources";

export const getAllProductsLoader = (queryClient: QueryClient): LoaderFunction => async() => {
  try {
    const query = productsQuery();
    const productsDb = getResourcesOrFetchResources<Product[]>(query, queryClient);

    return productsDb
  } catch (error) {
    return error;
  }
}