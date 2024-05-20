import { AuthState } from "./authState";
import { CartItemState } from "./cartItemState";
import { CustomerState } from "./customerState";
import { OrderState } from "./orderState";
import { ProductState } from "./productState";
import { UserState } from "./userState";

export class AllState{
  auth!: AuthState;
  cart!: CartItemState;
  customer!: CustomerState;
  order!: OrderState;
  product!: ProductState;
  user!: UserState

}