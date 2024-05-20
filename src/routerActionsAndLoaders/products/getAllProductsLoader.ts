import { LoaderFunction } from "react-router-dom";
import { productsQuery } from "../../queries/products/productsQuery";
import { QueryClient } from "@tanstack/react-query";

export const getAllProductsLoader = (queryClient: QueryClient): LoaderFunction => async() => {
  try {
    const query = productsQuery();
    return await queryClient.ensureQueryData(query)
    
  } catch (error) {
    return error;
  }
}