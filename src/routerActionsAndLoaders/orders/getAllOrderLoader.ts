import { LoaderFunction} from "react-router-dom";
import { ordersQuery } from "../../queries/orders/ordersQuery";
import { getOrdersOrFetchOrders } from "../../general/getOrdersOrFetchOrders";
import { StoreAndQClient } from "../../router";
import { getAllOrdersFromDb } from "../../features/orderSlice";
import { OrderModel } from "../../models/OrderModel";

export const getAllOrderLoader =({store, queryClient}: StoreAndQClient): LoaderFunction => async() => {
  try {
    const query = ordersQuery();
    const ordersDb = await getOrdersOrFetchOrders(query, queryClient); 
    store.dispatch(getAllOrdersFromDb({orders: ordersDb as OrderModel[]}));
    console.log("In get-orders-loaders", {ordersDb})
    //return queryClient.ensureQueryData(query);
    /* return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    ); */
    return ordersDb;
  } catch (error) {
    return error
  }
}