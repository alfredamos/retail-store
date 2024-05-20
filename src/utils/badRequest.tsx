import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { NavBar } from "./NavBar";

function BadRequestError() {
   const error = useRouteError();
   console.log({error})
   return (
     <>
       <NavBar />
       <div>Oops</div>
       <div>
         {isRouteErrorResponse(error)
           ? "This page does not exist!"
           : "An unexpected error occurred! "}
       </div>
     </>
   );
}

export default BadRequestError