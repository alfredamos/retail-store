import { LoaderFunction} from "react-router-dom";
import { orderService } from "../../APIRoutes/orderRoute";

export const getAllOrderLoader: LoaderFunction = async() => {
  try {
    const ordersDb = await orderService.getAll();
   
       return ordersDb;
  } catch (error) {
    return error
  }
}