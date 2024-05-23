import { Outlet, useLoaderData } from "react-router-dom";
import OrdersTable from "../../components/UI/orders/OrdersTable";
import { OrderModel } from '../../models/OrderModel';

function OrderListView() {
  const orders = useLoaderData() as OrderModel[]
   
  console.log({orders})

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          {<OrdersTable orders={orders  || []} />}
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default OrderListView;
