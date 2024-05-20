import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState } from "../states/orderState";
import { OrderProduct } from "../models/OrderProduct";
import { CartItem } from "../validations/cartItemValidation";
import { OrderModel } from "../models/OrderModel";

const defaultState: OrderState = {
  customerId: "",
  orders: [],
  ordersFromDb: [],
  order: {customerId: "", cartItems: []},
  totalCost: 0,
  quantities: 0,
};

const getOrderFromLocalStorage = (): OrderState => {
  const order = localStorage.getItem("order");

  return order ? JSON.parse(order) : defaultState;
};

const orderSlice = createSlice({
  name: "order",
  initialState: getOrderFromLocalStorage(),
  reducers: {
   
    addOrder(state, action: PayloadAction<{ order: OrderProduct }>) {
      state.orders.push(action.payload.order);      
      state.order = action.payload.order;
      state.customerId = action.payload.order.customerId;
      localStorage.setItem("order", JSON.stringify(state));
    },    
    addOrderDb(state, action: PayloadAction<{ order: OrderModel }>) {
      state.ordersFromDb.push(action.payload.order);      
      
      localStorage.setItem("orderDb", JSON.stringify(state));
    },    
    clearOrder(state) {
      state.orders = defaultState.orders;
      localStorage.removeItem("order");
    },
    clearTotalCostAndQuantities(state) {
      state.quantities = defaultState.quantities;
      state.totalCost = defaultState.totalCost;
      
      localStorage.removeItem("order");
    },
    deleteOrder(state, action: PayloadAction<{ id: string }>) {
      const filteredOrder = state.orders?.filter(
        (order) => order.id !== action.payload.id
      );
      state.orders = filteredOrder;

      localStorage.setItem("order", JSON.stringify(state));
    },
    editOrder(state, action: PayloadAction<{ order: OrderProduct }>) {
      const index = state.orders?.findIndex(
        (order) => order.id === action.payload.order.id
      );
      state.orders[index] = action.payload.order;

      localStorage.setItem("order", JSON.stringify(state));
    },
    findOrderByCustomerId(state, action: PayloadAction<{customerId:string}>){
      state.order = state.orders?.find(order => order.customerId === action.payload.customerId) as OrderProduct;
    },
    getAllOrders(state, action: PayloadAction<{ orders: OrderProduct[] }>) {
      state.orders = action.payload.orders;

      localStorage.setItem("order", JSON.stringify(state));
    },
    getAllOrdersFromDb(state, action: PayloadAction<{ orders: OrderModel[] }>) {
      state.ordersFromDb = action.payload.orders;

      localStorage.setItem("order", JSON.stringify(state));
    },
    totalCostAndQuantities(
      state,
      action: PayloadAction<{ cartItems: CartItem[] }>
    ) {
      state.totalCost = action.payload.cartItems.reduce(
        (accum, current) => accum + current.price * current.quantity,
        0
      );
      state.quantities = action.payload.cartItems.reduce(
        (accum, current) => accum + current.quantity,
        0
      );
    },
  },
});

export const {
  addOrder,
  addOrderDb,
  clearOrder,
  clearTotalCostAndQuantities,
  deleteOrder,
  editOrder,
  findOrderByCustomerId,
  getAllOrders,
  getAllOrdersFromDb,
  totalCostAndQuantities,
} = orderSlice.actions;

export default orderSlice.reducer;
