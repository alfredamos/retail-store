import { APIService } from "../services/dataService";
import { Product } from "../validations/productValidation";

export const productService = new APIService<Product>("/products");