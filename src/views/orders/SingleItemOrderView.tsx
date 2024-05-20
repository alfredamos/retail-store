import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getOneProductLoader} from "../../routerActionsAndLoaders/products/getOneProductLoader";
import { useQuery } from "@tanstack/react-query";
import { productOneQuery } from "../../queries/products/productOneQuery";
import DisplayOneProduct from "../../components/UI/products/DisplayOneProduct";
import { Product } from "../../validations/productValidation";
import { useState } from "react";
import { CartItem } from "../../validations/cartItemValidation";
import { useGetCustomerId } from "../../hooks/customers/useGetCustomerId";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CartItemsDisplay from "../../components/UI/orders/CartItemsDisplay";
import { findCartItem } from "../../components/components-utils/findCartItem";
import { createCartItem } from "../../components/components-utils/createCartItem";
import { modifiedCartItemQuantity } from "../../components/components-utils/modifiedCartItemQuantity";
import { useGetOrderAndCartItems } from "../../hooks/useGetOrderAndCartItems";
import { addOrder, clearOrder, findOrderByCustomerId, totalCostAndQuantities } from "../../features/orderSlice";
import { OrderProduct } from "../../models/OrderProduct";
import { initialCart } from "../../components/components-utils/initialCart";
import { useOrder } from "../../hooks/orders/useOrder";

function SingleOrderView() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  //----> Get the customer id and the orders by the same customer if there is any.
  const { customerId } = useGetCustomerId();

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
    cartAndCheckoutMaker(carts);
    navigate("/products");
  };

  const backToListHandler = () => {
    cartAndCheckoutMaker(cartItems);
    navigate("/products");
  };

  const checkToHandler = (carts: CartItem[]) => {
    console.log("clicked");
    console.log("In single-order checkout : ", { carts });
    cartAndCheckoutMaker(carts)
    navigate("/checkout");
  };

  const goToCartHandler = (carts: CartItem[]) => {
    console.log("In single-order goToCart : ", { carts });
    console.log({ carts });
    cartAndCheckoutMaker(carts);
     navigate("/cart");
  };

  let cartsTemp: CartItem[] = [];
  let orderTemp:OrderProduct = {cartItems: [], customerId: ""};

  const addToCartHandler = (product: Product) => {
    
    if (!product) return;

    //----> Check if cart-item already exist.
    const cart = findCartItem(cartItems, product) as CartItem;

    makeCartItem(product, cart);
    setShowCartItems(!showCartItems);

  };

  const viewCartHandler = (carts: CartItem[]) => {
    dispatch(addOrder({ order: { cartItems: carts, customerId } }));
    setShowCartItems(!showCartItems);
  }; 

  const makeCartItem = (product: Product, cart: CartItem = initialCart) => {
    if (cart?.quantity > 0) {
      //----> Modified the cart-item quantity, for existing cart by one.
      const tempCartItems = modifiedCartItemQuantity(cartItems, cart);
      cartsTemp = [...tempCartItems];
    } else {
      //----> Cart-item does not exist, then create it.
      const cartItem = createCartItem(product);
      cartsTemp = [...cartItems, cartItem];
    }
    //----> Make a list of cart-items.
    setCartItems(cartsTemp);
    orderTemp = { ...order, customerId, cartItems: cartsTemp };
    //----> set order state.
    setOrder(orderTemp);
    dispatch(totalCostAndQuantities({ cartItems: cartsTemp }));

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

    dispatch(totalCostAndQuantities({ cartItems: carts }));

    dispatch(findOrderByCustomerId({ customerId })); //----> Latest order.
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
          onGoToCart={goToCartHandler}
        />
          
      
      )}
    </>
  );
}

export default SingleOrderView;
