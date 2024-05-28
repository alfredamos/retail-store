import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerState } from "../states/customerState";
import { Customer } from "../validations/customerValidation";

const defaultState: CustomerState = {
  customers: [],
};

/* const getCustomerFromLocalStorage = (): CustomerState => {
  const customer = localStorage.getItem("customer");

  return customer ? JSON.parse(customer) : defaultState;
}; */

const customerSlice = createSlice({
  name: "customer",
  initialState: defaultState,
  reducers: {
    addCustomer(state, action: PayloadAction<{customer: Customer}>) {
      state.customers.push(action.payload.customer);

      localStorage.setItem("customer", JSON.stringify(state));
    },
    deleteCustomer(state, action: PayloadAction<{id: string}>) {
      const filteredCustomer = state.customers?.filter(
        (customer) => customer.id !== action.payload.id
      );
      state.customers = filteredCustomer;
    
      localStorage.setItem("customer", JSON.stringify(state));
    },
    editCustomer(state, action: PayloadAction<{customer: Customer}>) {
      const index = state.customers?.findIndex(
        (customer) => customer.id === action.payload.customer.id
      );
      state.customers[index] = action.payload.customer;
    
      localStorage.setItem("customer", JSON.stringify(state));
    },
    getAllCustomers(state, action: PayloadAction<{customers: Customer[]}>) {
      state.customers = action.payload.customers;
    
      localStorage.setItem("customer", JSON.stringify(state));
    },
    
  },
});

export const { addCustomer, deleteCustomer, editCustomer, getAllCustomers} =
  customerSlice.actions;

export default customerSlice.reducer;
