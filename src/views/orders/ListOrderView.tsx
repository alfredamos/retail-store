import { Outlet, useLoaderData } from "react-router-dom";
import OrdersTable from "../../components/UI/orders/OrdersTable";
import { OrderModel } from "../../models/OrderModel";

function ListOrderView() {
  const orders = useLoaderData() as OrderModel[];
  
  console.log("In order-list-view", {orders})

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <OrdersTable baseUrl="orders" orders={orders  || []} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ListOrderView