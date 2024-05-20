import { OrderModel } from "../../../models/orderModel";
import { CartItem } from "../../../validations/cartItemValidation";

interface Props{
  order: OrderModel;
  cartItem: CartItem;
  name: string
}
function CartItemsDisplayNew({order, cartItem, name}:Props) {
  console.log({order})
  return (
    <div className="card">
      <h4 className="text-center">Order No. {order.id}</h4>
      <hr />
      <div className="d-flex flex-column">
        <div className="d-flex">
          <span>Product</span>
          <span>{cartItem.name}</span>
          <span>Delete</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Price</span>
          <span>${cartItem.name}</span>
          <span>Add</span>
        </div>
        <div className="d-flex">
          <span>Quantity</span>
          <span>{cartItem.quantity}</span>
          <span>Remove</span>
        </div>
      </div>
      <hr />
      <div className="flex flex-column">
        <div className="flex justify-content-between">
          <div>
            <span>Total</span>
            <span>{order.totalPrice}</span>
          </div>
          <div>
            <span>Quantity</span>
            <span>{order.totalQuantity}</span>
          </div>
          <div>
            <span>Order By</span>
            <span>{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemsDisplayNew;
