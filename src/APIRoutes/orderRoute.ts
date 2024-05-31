import { OrderModel } from "../models/OrderModel";
import { OrderProduct } from "../models/OrderProduct";
import { APIService } from "../services/dataService";

export const orderService = new APIService<OrderProduct>("/orders");

export const orderDeleteAllByCustomerIdService = new APIService<OrderProduct>(
  "orders/delete-all-orders-by-customer-id"
);

export const orderDeleteAllByUserIdService = new APIService<OrderProduct>(
  "orders/delete-all-orders-by-user-id"
);

export const orderDeliveredService = new APIService<OrderModel>("orders/delivered");
export const orderShippedService = new APIService<OrderModel>("orders/shipped");
export const ordersByCustomerIdService = new APIService<OrderModel>("orders/orders-by-customer-id");
export const ordersByUserIdService = new APIService<OrderModel>("orders/orders-by-user-id");
