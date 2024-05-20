import { ActionFunction, redirect } from "react-router-dom";
import { productService } from "../../APIRoutes/productRoute";
import { deleteProduct } from "../../features/productSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AllState } from "../../states/allState";

export const deleteProductFormAction=(store: EnhancedStore<AllState>): ActionFunction => async ({ params }) => {
  const id = params.id as string;  
  try {
    await productService.remove(id);
    store.dispatch(deleteProduct({ id }));

    return redirect("/list-products");
  } catch (error) {
    return error;
  }
};
