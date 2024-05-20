import { type OrderModel } from "../../../models/orderModel"
import DisplayOrderCartItemsNew from "./DisplayOrderCartItemsNew"

interface Props{
  order: OrderModel;
  name: string;
}

function DisplayOrderByCustomerNew({order, name}: Props) {
  console.log({order, name})
  return (
    order.cartItems?.map(cartItem => <DisplayOrderCartItemsNew key={cartItem.productId} cartItem={cartItem}  order={order} name={name}/>)
  )
}

export default DisplayOrderByCustomerNew