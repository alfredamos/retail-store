import { Link } from "react-router-dom";
import DisplayProductRow from "./DisplayProductRow";
import { Product } from "../../../validations/productValidation";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";

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
          <FaPlus
            size="15px"
            style={{ marginRight: "5px", alignSelf: "center" }}
          />{" "}
          Product
        </Link>
        <Link
          to={`${routePicker ? "/admin-panel" : "/admin-main-panel"}`}
          className="btn btn-outline-primary w-50 fw-bold rounded-5"
        >
          <FaArrowLeft
            size="15px"
            style={{
              marginRight: "5px",
              alignSelf: "center",
              fontWeight: "bold",
            }}
          />
          Admin
        </Link>
      </div>
    </div>
  );
}
