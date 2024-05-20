import { LoaderFunction } from "react-router-dom";
import { currentUserService } from '../../APIRoutes/authRoutes';

export const currentUserLoader: LoaderFunction = async () => {
  
  try {
    const response = await currentUserService.currentUser();
    console.log({currentUser: response})
    return response;
  } catch (error ) {
    return error;
  }
};
