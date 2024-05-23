import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getOneProductLoader} from "../../routerActionsAndLoaders/products/getOneProductLoader";
import { useQuery } from "@tanstack/react-query";
import { productOneQuery } from "../../queries/products/productOneQuery";
import DisplayOneProduct from "../../components/UI/products/DisplayOneProduct";
import { Product } from "../../validations/productValidation";
import { useState } from "react";
import { CartItem } from "../../validations/cartItemValidation";
import { useGetCustomerUIOrders } from "../../hooks/customers/useGetCustomerId";
import { useDispatch } from "react-redux";
import CartItemsDisplay from "../../components/UI/orders/CartItemsDisplay";
import { findCartItem } from "../../components/components-utils/findCartItem";
import { useGetOrderAndCartItems } from "../../hooks/useGetOrderAndCartItems";
import { addOrder } from "../../features/orderSlice";
import { OrderProduct } from "../../models/OrderProduct";
import { useOrder } from "../../hooks/orders/useOrder";
import { makeCartItem } from "../../components/components-utils/makeCartItem";
import { cartAndCheckoutMaker } from "../../components/components-utils/cartAndCheckoutMaker";

function SingleOrderView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  //----> Get the customer id and the orders by the same customer if there is any.
  const { customerId } = useGetCustomerUIOrders();

  //----> Get orders from redux store.
  const {orders} = useOrder();

  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof getOneProductLoader>>
  >;
  const { data: product } = useQuery({
    ...productOneQuery(id as string),
    initialData,
  });

  const {cartItems, order, setCartItems, setOrder} = useGetOrderAndCartItems(orders, customerId)
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

  const checkToHandler = (carts: CartItem[]) => {
    console.log("clicked");
    console.log("In single-order checkout : ", { carts });
    //cartAndCheckoutMaker(carts)
    cartAndCheckoutMaker(
      carts,
      cartItems,
      customerId,
      dispatch,
      orderTemp,
      setCartItems,
      setOrder
    );
    navigate("/checkout");
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
  const orderTemp:OrderProduct = {cartItems: [], customerId: ""};

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
          className="btn btn-outline-secondary w-50 fw-bold"
          style={{ borderRadius: "20px" }}
          onClick={backToListHandler}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-outline-primary w-50 fw-bold"
          style={{ borderRadius: "20px" }}
          onClick={() => addToCartHandler(product as Product)}
        >
          Add To Cart
        </button>
        <button
          type="button"
          className="btn btn-outline-dark w-50 fw-bold"
          style={{ borderRadius: "20px" }}
          onClick={() => viewCartHandler(cartItems)}
        >
          View Cart
        </button>
      </DisplayOneProduct>
      {showCartItems && (
        <CartItemsDisplay
          onBackToProducts={backToProductListHandler}
          cartItems={cartItems}
          onCheckout={checkToHandler}
          onDetailProduct={detailCartHandler}
          onGoToCart={goToCartHandler}
        />
      )}
    </>
  );
}

export default SingleOrderView;
