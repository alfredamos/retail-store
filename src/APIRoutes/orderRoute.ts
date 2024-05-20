import { OrderProduct } from "../models/OrderProduct";
import { APIService } from "../services/dataService";

export const orderService = new APIService<OrderProduct>("/orders");