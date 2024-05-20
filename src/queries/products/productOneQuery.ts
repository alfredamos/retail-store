import { productService } from "../../APIRoutes/productRoute";

export const productOneQuery = (id: string) => ({
  queryKey: ["products", id],
  queryFn: () => productService.getOne(id)
});