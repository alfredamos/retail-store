import { ActionFunction, redirect } from "react-router-dom";
import { CartItem } from "../../validations/cartItemValidation";
import { cartItemService } from "../../APIRoutes/cartItemRoute";
import store from "../../store";
import { addCartItem } from"../../features/cartItemSlice";

export const addCartItemFormAction: ActionFunction = async({request}) => {
  const formData = await request.formData();
  const newCartItem = Object.fromEntries(formData) as unknown as CartItem;

  try {
    const data = await cartItemService.create(newCartItem);
    store.dispatch(addCartItem({cartItem: data}))

    return redirect("/cart-items");
    
  } catch (error) {
    return error
  }
}