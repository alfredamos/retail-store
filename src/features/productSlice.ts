import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "../states/productState";
import { Product } from "../validations/productValidation";

const defaultState: ProductState = {
  products: [],
};

const getProductFromLocalStorage = (): ProductState => {
  const product = localStorage.getItem("product");

  return product ? JSON.parse(product) : defaultState;
}

const productSlice = createSlice({
  name: "product",
  initialState: getProductFromLocalStorage(),
  reducers: {
    addProduct(state, action: PayloadAction<{product: Product}>) {
      state.products.push(action.payload.product);
      localStorage.setItem("product", JSON.stringify(state));
    },
    deleteProduct(state, action: PayloadAction<{id: string}>) {
      const filteredProduct = state.products?.filter(
        (product) => product.id !== action.payload.id
      );
      state.products = filteredProduct;
      localStorage.setItem("product", JSON.stringify(state));
    },
    editProduct(state, action: PayloadAction<{product: Product}>) {
      const index = state.products?.findIndex(
        (product) => product.id === action.payload.product.id
      );
      state.products[index] = action.payload.product;

      localStorage.setItem("product", JSON.stringify(state));
    },
    getAllProducts(state, action: PayloadAction<{products: Product[]}>) {
      state.products = action.payload.products;
      localStorage.setItem("product", JSON.stringify(state));
    },
  },
});

export const { addProduct, deleteProduct, editProduct, getAllProducts } =
  productSlice.actions;

export default productSlice.reducer;
