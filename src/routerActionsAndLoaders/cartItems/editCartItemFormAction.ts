import { ActionFunction, redirect } from "react-router-dom";
import { CartItem } from "../../validations/cartItemValidation";
import { cartItemService } from "../../APIRoutes/cartItemRoute";
import store from "../../store";
import { editCartItem } from "../../features/cartItemSlice";

export const editCartItemFormAction: ActionFunction = async({params, request}) => {
  const id = params.id as string;

  const formData = await request.formData();
  const cartItemToEdit = Object.fromEntries(formData) as unknown as CartItem;

  try {
    const data = await cartItemService.update(id, cartItemToEdit);
    store.dispatch(editCartItem({cartItem: data}))

    return redirect("/cartItems");
    
  } catch (error) {
    return error
  }
}