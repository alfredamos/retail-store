import { ActionFunction, redirect } from "react-router-dom";
import { productService } from "../../APIRoutes/productRoute";
import { Product } from "../../validations/productValidation";
import { editProduct } from "../../features/productSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AllState } from "../../states/allState";

export const editProductFormAction =(store: EnhancedStore<AllState>): ActionFunction => async ({ request, params }) => {
  const id = params.id as string;
  
  const formData = await request.formData();
  const productToEdit = Object.fromEntries(formData) as unknown as Product;

  productToEdit.price = +productToEdit.price;
  productToEdit.quantity = +productToEdit.quantity;
  console.log({ productToEdit });

  try {
    const data = await productService.update(id, productToEdit);
    store.dispatch(editProduct({ product: data }));

    const baseURL = location?.pathname?.split("/")[1];
    console.log("In add-product", { baseURL });
    const routePicker = baseURL === "list-products";

    return redirect(`${routePicker ? "/list-products" : "/admin-products"}`);
  } catch (error) {
    return error;
  }
};
