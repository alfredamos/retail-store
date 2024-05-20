import { Outlet, useLoaderData } from "react-router-dom";
import { getAllOrderLoader } from "../../routerActionsAndLoaders/orders/getAllOrderLoader";
import { useQuery } from "@tanstack/react-query";
import { ordersQuery } from "../../queries/orders/ordersQuery";
import OrdersTable from "../../components/UI/orders/OrdersTable";
import { OrderModel } from "../../models/orderModel";

function ListOrderView() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof getAllOrderLoader>>>;

  const {data: orders, isSuccess} = useQuery({...ordersQuery(), initialData});
  
  console.log("In order-list-view", {orders})

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          {isSuccess && <OrdersTable orders={orders as OrderModel[] || []} />}
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ListOrderView