import { LoaderFunction} from "react-router-dom";
import { cartItemService } from "../../APIRoutes/cartItemRoute";

export const getOneCartItemLoader: LoaderFunction = async({params}) => {
  const id = params.id as string;

  try {
    const data = await cartItemService.getOne(id);

    return {...data};
    
  } catch (error) {
    return error
  }
}