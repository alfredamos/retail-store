import { useLoaderData, useNavigate } from "react-router-dom";
import { getAllProductsLoader } from "../../routerActionsAndLoaders/products/getAllProductsLoader";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "../../queries/products/productsQuery";
import ProductDisplay from "../../components/UI/products/ProductDisplay";
import { type Product } from "../../validations/productValidation";
import { useState } from "react";
import { type OrderProduct } from "../../models/OrderProduct";
import { type CartItem } from "../../validations/cartItemValidation";
import { useGetCustomerId } from "../../hooks/customers/useGetCustomerId";
import { useDispatch } from "react-redux";
import {
  addOrder,
  clearOrder,
  findOrderByCustomerId,
  totalCostAndQuantities,
} from "../../features/orderSlice";
import CartItemsDisplay from "../../components/UI/orders/CartItemsDisplay";
import { toast } from "react-toastify";
import { findCartItem } from "../../components/components-utils/findCartItem";
import { initialCart } from "../../components/components-utils/initialCart";
import { createCartItem } from "../../components/components-utils/createCartItem";
import { modifiedCartItemQuantity } from "../../components/components-utils/modifiedCartItemQuantity";
import { useGetOrderAndCartItems } from "../../hooks/useGetOrderAndCartItems";

export default function ProductListView() {
  const navigate = useNavigate();
  //----> State for showing cart-items.
  const [showCartItems, setShowCartItems] = useState(false);

  //----> Get the current-customer
  const { customerId,  ordersByCustomerId: orders } = useGetCustomerId();
  const dispatch = useDispatch();

 //---> Get the current, cartItems from the hook.
 const { cartItems, order, setCartItems, setOrder } = useGetOrderAndCartItems(
   orders,
   customerId
 );
  
  //----> Get all products via router-context.
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof getAllProductsLoader>>
  >;

  //----> Combine the useLoaderData with useQuery to enable cache.
  const { data: products } = useQuery({ ...productsQuery(), initialData });

  const backToListHandler = () => {
    navigate("/");
  };

  let cart: CartItem = initialCart;
  let cartItemsTemp: CartItem[] = [];
  let orderTemp: OrderProduct = {cartItems: [], customerId: ""};

  const addToCartHandler = (product: Product) => {
    if (!product) return;   

    //----> Check if cart-item already exist.
    cart = findCartItem(cartItems, product) as CartItem;

    makeCartItem(product, cart);
    setShowCartItems(!showCartItems)
  };

  const viewCartHandler = () => {
    console.log("In single-order, viewHandler",{cartItems})
    cartAndCheckoutMaker(cartItems)
    setShowCartItems(!showCartItems);
  };

  const viewDetailHandler = (productId: string) => {    
    cartAndCheckoutMaker(cartItems);
    navigate(`/product-details/${productId}`);
  };

  const checkoutHandler = (carts: CartItem[]) => {
    cartAndCheckoutMaker(carts);
    navigate("/checkout");
  };

  const goToCartHandler = (carts: CartItem[]) => {
    cartAndCheckoutMaker(carts);
    navigate("/cart");
  };

  const backToProductsHandler = (carts: CartItem[]) => {
    cartAndCheckoutMaker(carts);
    setShowCartItems(!showCartItems); //----> Open products selection.
  };

  const makeCartItem = (product: Product, cart: CartItem = initialCart) => {
    console.log({cartItems})
    if (cart?.quantity > 0) {
      //----> Modified the cart-item quantity, for existing cart by one.
      const tempCartItems = modifiedCartItemQuantity(cartItems, cart);
      cartItemsTemp = [...tempCartItems];
    } else {
      //----> Cart-item does not exist, then create it.
      const cartItem = createCartItem(product);
      cartItemsTemp = [...cartItems, cartItem];
    } 
    //----> Make a list of cart-items.
    setCartItems(cartItemsTemp);
    orderTemp = { ...order, customerId, cartItems: cartItemsTemp };
    //----> set order state.
    setOrder(orderTemp);
    dispatch(totalCostAndQuantities({ cartItems: cartItemsTemp }));

    toast.success(
      `The product : ${product.name} has been added successfully!`,
      {
        position: "top-right",
      }
    );
  };

  const cartAndCheckoutMaker = (carts: CartItem[]) => {
    dispatch(clearOrder()); //----> Clear the previous order

    setCartItems(carts); //----> Register the selected cart-items

    orderTemp = { customerId, cartItems }; //---> The updated order.
    console.log({ orderTemp, customerId });
    setOrder(orderTemp); //----> Register the current order selected.

    dispatch(addOrder({ order: orderTemp })); //----> store the current selected order in redux store.

    dispatch(totalCostAndQuantities({cartItems: carts}));

    dispatch(findOrderByCustomerId({ customerId })); //----> Latest order.
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          {(products as Product[])?.map((product) => (
            <div className="col col-lg-4 mb-4" key={product.id}>
              <ProductDisplay
                product={product}
                onBackToList={backToListHandler}
                addToCartHandler={addToCartHandler}
                viewCartHandler={viewCartHandler}
                viewDetailHandler={viewDetailHandler}
              />
            </div>
          ))}
        </div>
      </div>
      {showCartItems && (
        <CartItemsDisplay
          onBackToProducts={backToProductsHandler}
          cartItems={cartItems}
          onCheckout={checkoutHandler}
          onGoToCart={goToCartHandler}
        />
      )}
    </>
  );
}
