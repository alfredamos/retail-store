import { ActionFunction, redirect } from "react-router-dom";
import { cartItemService } from "../../APIRoutes/cartItemRoute";
import store from "../../store";
import { deleteCartItem } from "../../features/cartItemSlice";

export const deleteCartItemFormAction: ActionFunction = async({params}) => {
  const id = params.id as string;

  try {
    await cartItemService.remove(id);
    store.dispatch(deleteCartItem({id}))

    return redirect("/cart-items");
    
  } catch (error) {
    return error
  }
}