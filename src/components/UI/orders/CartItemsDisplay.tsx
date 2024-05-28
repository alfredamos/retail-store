import { useOrder } from "../../../hooks/orders/useOrder";
import { CartItem } from "../../../validations/cartItemValidation";
import Modal from "../../general/auth/Modal";
import { FaPlusMinus } from "react-icons/fa6";
import { useState, ChangeEvent, ReactNode, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { totalCostAndQuantities } from "../../../features/orderSlice";

interface CartItemsDisplayProps {
  cartItems: CartItem[];
  children?: ReactNode;
  onDetailProduct: (carts: CartItem[], productId?: string) => void;
  onGoToCart: (carts: CartItem[]) => void;
  onBackToProducts: (carts: CartItem[]) => void;
}

function CartItemsDisplay({
  onBackToProducts,
  cartItems,
  children,
  onDetailProduct,
  onGoToCart,
}: CartItemsDisplayProps) {
  const [carts, setCarts] = useState<CartItem[]>(cartItems);
  const [quantity, setQuantity] = useState(1);
  const [hasChangeQuantity, setHasChangeQuantity] = useState(false);

  const { quantities, totalCost } = useOrder();
  const dispatch = useDispatch();
  const selectedQuantities: number[] = [];
  [...Array(20).keys()].forEach((i) => selectedQuantities.push(i + 1));

  const goBackToProductsHandler = () => {
    onBackToProducts(carts);
  };

  const backToCartHandler = () => {
    onGoToCart(carts);
  };  

  const singleOrderHandler = (productId: string) => {
    onDetailProduct(carts, productId);    
  }

  const changeQuantityHandler = (
    event: ChangeEvent<HTMLSelectElement>,
    productId: string
  ) => {
    carts.forEach((cart) => {
      if (cart.productId === productId) {
        const value = +event.target.value;
        setQuantity(value);
        setHasChangeQuantity(true);
       
        console.log({ event, productId });
      }
    });
  };

  const quantityAdjustmentHandler = (productId: string) => {
    const value = (oldValue: number) =>
      oldValue + 1 <= 20 ? oldValue + 1 : 20;
   
    quantityIncreaseOrDecrease(carts, productId, value as unknown as number);
    if (!hasChangeQuantity) return;
  };
  
  const quantityIncreaseOrDecrease = (
    carts: CartItem[],
    productId: string,
    value: SetStateAction<number>
  ) => {
    const cartsTemp = carts.map((cartItem) => {
      if (cartItem.productId === productId) {
       //----> Update the quantity.
        setQuantity(value)
        setHasChangeQuantity(false);

        const cartTemp = { ...cartItem, quantity };
        return cartTemp;
      } else {
        const cartTemp = cartItem;
        return cartTemp;
      }
    }) as CartItem[];
    setCarts(cartsTemp);

    dispatch(totalCostAndQuantities({ cartItems: cartsTemp }));
  };

  return (
    <Modal>
      <div className="border border-1 p-4">
        {carts?.map((cart) => (
          <ul className="list-group" key={cart.productId}>
            <li className="list-group-item">Name : {cart.name}</li>
            <li className="list-group-item">Price:{cart.price}</li>
            <li className="list-group-item">
              {cart.quantity > 1 ? "quantities" : "quantity"}
              <div className="d-flex justify-content-center align-content-md-center">                
                <select
                  name="quantity"
                  className="form-select"
                  defaultValue={cart.quantity > 1 ? cart.quantity : quantity}
                  onChange={(event) =>
                    changeQuantityHandler(event, cart.productId)
                  }
                  
                >
                  {selectedQuantities.map((i, index) => (
                    <option value={i} key={index}>
                      {i}
                    </option>
                  ))}
                </select>
                <FaPlusMinus
                  size="1rem"
                  color="gray"
                  onClick={() => quantityAdjustmentHandler(cart.productId)}
                  style={{ marginLeft: "10px", alignSelf: "center", cursor: 'pointer' }}
                />
              </div>
            </li>
          </ul>
        ))}

        <div className="d-flex justify-content-between mt-4 mb-2">
          <span className="fs-6 fw-bold">
            {quantities > 1 ? "Quantities" : "Value"}
          </span>
          <span className="fw-bold">{quantities}</span>
        </div>
        <div className="d-flex justify-content-between mt-2 mb-2">
          <span className="fs-6 fw-bold">Total Cost </span>
          <span className="fw-bold">{totalCost}</span>
        </div>
        <hr />
        <div className="d-flex w-100 mx-auto">
          <button
            type="button"
            className="btn btn-outline-dark w-20 btn-sm rounded-5 fw-bold "
            onClick={goBackToProductsHandler}
          >
            Products
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary w-20  btn-sm rounded-5 fw-bold"
            onClick={backToCartHandler}
          >
            Cart
          </button>
          
          <button
            type="button"
            className="btn btn-outline-primary w-20 btn-sm fw-bold rounded-5"
            onClick={() =>
              singleOrderHandler(cartItems[cartItems.length - 1].productId)
            }
          >
            Detail
          </button>
          {children}
        </div>
        <hr />
      </div>
    </Modal>
  );
}

export default CartItemsDisplay;
