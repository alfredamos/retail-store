import { useLoaderData, useNavigate } from "react-router-dom";
import { type Product } from "../../validations/productValidation";
import { useState } from "react";
import { type OrderProduct } from "../../models/OrderProduct";
import { type CartItem } from "../../validations/cartItemValidation";
import { useDispatch } from "react-redux";
import CartItemsDisplay from "../../components/UI/orders/CartItemsDisplay";
import { findCartItem } from "../../components/components-utils/findCartItem";
import { initialCart } from "../../components/components-utils/initialCart";
import { useGetOrderAndCartItems } from "../../hooks/useGetOrderAndCartItems";
import { cartAndCheckoutMaker } from "../../components/components-utils/cartAndCheckoutMaker";
import { makeCartItem } from "../../components/components-utils/makeCartItem";
import { useOrder } from "../../hooks/orders/useOrder";
import { useGetCustomerUIOrders } from "../../hooks/customers/useGetCustomerUIOrders";
import ProductDisplayNew from "../../components/UI/products/ProductDisplayNew";
//import { AlertModal } from "../../utils/AlertModal";

export default function ProductListView() {
  const navigate = useNavigate();
  //----> State for showing cart-items.
  const [showCartItems, setShowCartItems] = useState(false);
  //----> Get the current-customer
  const { customerId } = useGetCustomerUIOrders();
  const dispatch = useDispatch();
  //----> Get orders from redux store.
  const { orders } = useOrder();
  //---> Get the current, cartItems from the hook.
  const { cartItems, order, setCartItems, setOrder } = useGetOrderAndCartItems(
    orders,
    customerId
  );

  //----> Initialize cart, cartItemsTemp and orderTemp.
  let cart: CartItem = initialCart;
  const cartItemsTemp: CartItem[] = [];
  const orderTemp: OrderProduct = { cartItems: [], customerId: "" };

  //----> Get all products via router-context.
  const products = useLoaderData() as Product[];

  const addToCartHandler = (product: Product) => {
    if (!product) return;

    //----> Check if cart-item already exist.
    cart = findCartItem(cartItems, product) as CartItem;

    //makeCartItem(product, cart);
    makeCartItem(
      customerId,
      product,
      cart,
      cartItems,
      cartItemsTemp,
      orderTemp,
      order,
      dispatch,
      setOrder,
      setCartItems
    );
    setShowCartItems(!showCartItems);
  };

  const viewDetailHandler = (productId: string) => {
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
    navigate(`/product-details/${productId}`);
  };

  const goToCartHandler = (carts: CartItem[]) => {
    //cartAndCheckoutMaker(carts);
    console.log("At entrance, carts : ", carts);
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

  const detailViewHandler = (carts: CartItem[], productId?: string) => {
    if (!productId) return;
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
    navigate(`/product-details/${productId}`);
  };

  const backToProductsHandler = (carts: CartItem[]) => {
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
    setShowCartItems(!showCartItems); //----> Open products selection.
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {(products as Product[])?.map((product) => (
            <div className="col col-lg-4 mb-4" key={product.id}>
              <ProductDisplayNew product={product as Product}>
                <button
                  type="button"
                  onClick={() => addToCartHandler(product)}
                  className="btn btn-outline-secondary fw-bold w-100 font-small"
                  style={{ borderRadius: "20px" }}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => viewDetailHandler(product.id as string)}
                  className="btn btn-outline-dark fw-bold w-100 font-sm"
                  style={{ borderRadius: "20px" }}
                >
                  Product Detail
                </button>
              </ProductDisplayNew>
            </div>
          ))}
        </div>
      </div>
      {showCartItems && (
        <CartItemsDisplay
          onBackToProducts={backToProductsHandler}
          cartItems={cartItems}
          onDetailProduct={detailViewHandler}
          onGoToCart={goToCartHandler}
        />
      )}
    </>
  );
}
