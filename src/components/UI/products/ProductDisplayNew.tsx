import { Product } from "../../../validations/productValidation";
import {ReactNode} from "react"

interface Props {
  product: Product;
 children: ReactNode;
}

export default function ProductDisplayNew({
  children,
  product,
}: Props) {
  return (
    <div className="card card-border-primary shadow-lg h-auto text-black">
      <div className="card-header border-light">
        <h4 className="text-center text-black">{product.name}</h4>
      </div>
      <div className="card-body">
        <ul className="list-group">
          <li className="list-group item">
            <p>{product.brand}</p>
          </li>
          <li className="list-group item">
            <p>{product.price}</p>
          </li>
        </ul>
      </div>
      <div className="card-footer text-center">
        {children}
      </div>
    </div>
  );
}
