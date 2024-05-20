import { OrderModel } from "../models/OrderModel";
import { OrderProduct } from "../models/OrderProduct";

export class OrderState{
  customerId: string = ""
  orders: OrderProduct[] = [];
  ordersFromDb: OrderModel[] = [];
  order: OrderProduct = null!;
  totalCost: number = 0;
  quantities: number = 0;

}