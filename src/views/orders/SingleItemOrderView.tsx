import { useLoaderData, useNavigate } from "react-router-dom";
import DisplayOneProduct from "../../components/UI/products/DisplayOneProduct";
import { Product } from "../../validations/productValidation";
import { useState } from "react";
import { CartItem } from "../../validations/cartItemValidation";
import { useGetCustomerUIOrders } from "../../hooks/customers/useGetCustomerUIOrders";
import { useDispatch } from "react-redux";
import CartItemsDisplay from "../../components/UI/orders/CartItemsDisplay";
import { findCartItem } from "../../components/components-utils/findCartItem";
import { useGetOrderAndCartItems } from "../../hooks/orders/useGetOrderAndCartItems";
import { addOrder } from "../../features/orderSlice";
import { OrderProduct } from "../../models/OrderProduct";
import { useOrder } from "../../hooks/orders/useOrder";
import { makeCartItem } from "../../components/components-utils/makeCartItem";
import { cartAndCheckoutMaker } from "../../components/components-utils/cartAndCheckoutMaker";
import { FaPlus } from "react-icons/fa6";

function SingleOrderView() {
  const dispatch = useDispatch();
  //const { id } = useParams();
  const navigate = useNavigate();

  //----> Get the customer id and the orders by the same customer if there is any.
  const { customerId } = useGetCustomerUIOrders();

  //----> Get orders from redux store.
  const { orders } = useOrder();

  const product = useLoaderData() as Product;

  const { cartItems, order, setCartItems, setOrder } = useGetOrderAndCartItems(
    orders,
    customerId
  );
  const [showCartItems, setShowCartItems] = useState(false);

  const backToProductListHandler = (carts: CartItem[]) => {
    console.log("In single-order backToProductListHandler : ", { carts });
    //cartAndCheckoutMaker(carts);
    cartAndCheckoutMaker(
      carts,
      cartItems,
      customerId,
      dispatch,
      orderTemp,
      setCartItems,
      setOrder
    );
    navigate("/products");
  };

  const backToListHandler = () => {
    //cartAndCheckoutMaker(cartItems);
    cartAndCheckoutMaker(
      cartItems,
      cartItems,
      customerId,
      dispatch,
      orderTemp,
      setCartItems,
      setOrder
    );
    navigate("/products");
  };

  const goToCartHandler = (carts: CartItem[]) => {
    console.log("In single-order goToCart : ", { carts });
    console.log({ carts });
    //cartAndCheckoutMaker(carts);
    cartAndCheckoutMaker(
      carts,
      cartItems,
      customerId,
      dispatch,
      orderTemp,
      setCartItems,
      setOrder
    );
    navigate("/cart");
  };

  const cartsTemp: CartItem[] = [];
  const orderTemp: OrderProduct = { cartItems: [], customerId: "" };

  const addToCartHandler = (product: Product) => {
    if (!product) return;
    //----> Check if cart-item already exist.
    const cart = findCartItem(cartItems, product) as CartItem;
    //makeCartItem(product, cart);
    makeCartItem(
      customerId,
      product,
      cart,
      cartItems,
      cartsTemp,
      orderTemp,
      order,
      dispatch,
      setOrder,
      setCartItems
    );
    setShowCartItems(!showCartItems);
  };

  const viewCartHandler = (carts: CartItem[]) => {
    dispatch(addOrder({ order: { cartItems: carts, customerId } }));
    setShowCartItems(!showCartItems);
  };

  const detailCartHandler = (carts: CartItem[]) => {
    dispatch(addOrder({ order: { cartItems: carts, customerId } }));
    setShowCartItems(!showCartItems);
  };

  return (
    <>
      <DisplayOneProduct product={product as Product}>
        <button
          type="button"
          className="btn btn-outline-secondary w-30 fw-bold btn-sm rounded-3"
          onClick={backToListHandler}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-outline-primary w-30 fw-bold btn-sm rounded-3"
          onClick={() => addToCartHandler(product as Product)}
        >
          <FaPlus size="10px" style={{alignSelf: 'center'}}/>Cart
        </button>
        <button
          type="button"
          className="btn btn-outline-dark w-30 fw-bold btn-sm rounded-3"
          onClick={() => viewCartHandler(cartItems)}
        >
          View Cart
        </button>
      </DisplayOneProduct>
      {showCartItems && (
        <CartItemsDisplay
          onBackToProducts={backToProductListHandler}
          cartItems={cartItems}
          onDetailProduct={detailCartHandler}
          onGoToCart={goToCartHandler}
        />
      )}
    </>
  );
}

export default SingleOrderView;
