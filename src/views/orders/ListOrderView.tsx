import { useLoaderData, useNavigate } from "react-router-dom";
import { OrderModel } from "../../models/OrderModel";
import { useShipped } from "../../hooks/orders/useShippedOrder";
import { useDelivered } from "../../hooks/orders/useDeliveredOrder";
import DisplayTableOrdersAdmin from "../../components/UI/orders/DisplayTableOrdersAdmin";

function ListOrderView() {
  const orders = useLoaderData() as OrderModel[];
  const navigate = useNavigate();

  const { mutateAsync: shippedAsync } = useShipped();
  const { mutateAsync: deliveredAsync } = useDelivered();

  console.log({ orders });

  const shippedHandler = (order: OrderModel) => {
    console.log("Shipped!!!!!!!");
    shippedAsync({ id: order.id, order }).then().catch();
  };

  const deliveredHandler = (order: OrderModel) => {
    console.log("delivered!!!!!!!");
    deliveredAsync({ id: order.id, order }).then().catch();
  };

  const viewHandler = (id: string) => {
    console.log("Let me view please", id);
    navigate(`/admin-orders/view/${id}`);
  };

  return (
    <DisplayTableOrdersAdmin
      orders={orders}
      onIsDeliveredOrder={deliveredHandler}
      onIsShippedOrder={shippedHandler}
      onViewOrder={viewHandler}
    />
  );
}

export default ListOrderView;
