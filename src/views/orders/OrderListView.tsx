import { Outlet, useLoaderData } from "react-router-dom";
import OrdersTable from "../../components/UI/orders/OrdersTable";
import { OrderModel } from '../../models/OrderModel';

function OrderListView() {
  const orders = useLoaderData() as OrderModel[]
   /* const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof getAllOrderLoader>>
  >;

  const { data: orders, isSuccess} = useQuery({
    ...ordersQuery(),
    initialData,
  }); */ 

  //console.log({orders, ordersDb})
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
