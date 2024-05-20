import { isRouteErrorResponse, useRouteError } from "react-router-dom";
//import { NavBar } from "./NavBar";

function ComponentError() {
   const error = useRouteError();
   console.log({error})
   return (
     <>
       {/* <NavBar /> */}
       <div>Waoh!!!</div>
       <div>
         {isRouteErrorResponse(error)
           ? `An error, ${error.data} occurs in your page!`
           : "An unexpected error occurred! "}
       </div>
     </>
   );
}

export default ComponentError