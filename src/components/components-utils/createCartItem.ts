import { Product } from "../../validations/productValidation";

export const createCartItem = (product: Product) => {
  return {
    name: product.name,
    price: product.price,
    quantity: 1,
    productId: product.id!,
  };
};
