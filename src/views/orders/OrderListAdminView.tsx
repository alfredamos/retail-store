import { useLoaderData } from "react-router-dom";
import OrdersTable from "../../components/UI/orders/OrdersTable";
import { OrderModel } from '../../models/OrderModel';

function OrderListAdminView() {
  const orders = useLoaderData() as OrderModel[]
   
  console.log({orders})

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <OrdersTable 
          baseUrl="admin-orders"
          orders={orders  || []} />
        </div>       
      </div>
    </div>
  );
}

export default OrderListAdminView;
