import { Link } from "react-router-dom";
import DisplayProductRow from "./DisplayProductRow";
import { Product } from "../../../validations/productValidation";
import { GrUserAdmin } from "react-icons/gr";
import { RiProductHuntLine } from "react-icons/ri";

interface Props {
  products: Product[];
  baseUrl: string;
}

export default function ProductsTable({ baseUrl, products }: Props) {
  const routePicker = baseUrl === "list-products";
  return (
    <div className="card">
      <div className="card-header bg-primary text-white p-3">
        <h4 className="text-center">Product List</h4>
      </div>
      <div className="card-body">
        <table className="table table-responsive table-striped table-bordered">
          <thead>
            <tr>
              <th className="fw-bold">Name</th>
              <th className="fw-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <DisplayProductRow baseUrl={baseUrl} product={product} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex justify-content-center p-3 text-center">
        <Link
          to="/list-products/new"
          className="btn btn-outline-secondary w-50 fw-bold d-flex rounded-5"
        >
          <RiProductHuntLine size="20px"/>Product
        </Link>
        <Link
          to={`${routePicker ? "/admin-panel" : "/admin-main-panel"}`}
          className="btn btn-outline-primary w-50 fw-bold rounded-5"
        >
          <GrUserAdmin size="20px" />
          Admin
        </Link>
      </div>
    </div>
  );
}
