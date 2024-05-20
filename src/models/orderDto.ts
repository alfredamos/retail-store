import CartItemDto from "./cartItemDto";
import { ProductDto } from "./productDto";

export class OrderDto{
  id: string = "";
  product: ProductDto = new ProductDto();
  totalQuantity: number = 0;
  totalPrice: number = 0;
  cartItems: CartItemDto[] = []
}