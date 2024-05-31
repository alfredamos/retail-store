import { useLoaderData, useNavigate} from "react-router-dom";
import { OrderModel } from "../../models/OrderModel";
import DisplayTableOrders from "../../components/UI/orders/DisplayTableOrders";

function CustomerAllOrdersView() {
  const orders = useLoaderData() as OrderModel[];
  const navigate = useNavigate();

  
  const viewOrderHandler = (id: string) => {
    console.log("Let me view please", id);
    navigate(`/admin-orders/view/${id}`);
  };

  return <DisplayTableOrders
  orders={orders}
  onViewOrder={viewOrderHandler}
  />;
}

export default CustomerAllOrdersView