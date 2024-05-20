import { LoaderFunction} from "react-router-dom";
import { cartItemService } from "../../APIRoutes/cartItemRoute";

export const getAllCartItemLoader: LoaderFunction = async() => {
  try {
    const data = await cartItemService.getAll();

    return data;
    
  } catch (error) {
    return error
  }
}