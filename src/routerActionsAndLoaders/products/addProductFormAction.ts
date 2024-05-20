import { ActionFunction, redirect } from "react-router-dom";
import { productService } from "../../APIRoutes/productRoute";
import { Product } from "../../validations/productValidation";
import { addProduct } from "../../features/productSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AllState } from "../../states/allState";

export const addProductFormAction =(store: EnhancedStore<AllState>): ActionFunction => async ({ request }) => {
  const formData = await request.formData();
  const newProduct = Object.fromEntries(formData) as unknown as Product;
  newProduct.price = +newProduct.price;
  newProduct.quantity = +newProduct.quantity;
  console.log({newProduct})
  try {
    const data = await productService.create(newProduct);
    store.dispatch(addProduct({ product: data }));
    console.log({data})
   
    return redirect("/list-products");
  } catch (error) {
    console.log({error})
    return error;
  }
};
