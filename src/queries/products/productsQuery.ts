import { productService } from "../../APIRoutes/productRoute";

export const productsQuery = () => ({
  queryKey: ["products"],
  queryFn: () => productService.getAll(),
});