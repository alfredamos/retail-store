import { APIService } from "../services/dataService";
import { CartItem } from "../validations/cartItemValidation";

export const cartItemService = new APIService<CartItem>("/cart-items");