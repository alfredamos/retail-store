import { Link } from "react-router-dom";
import DisplayProductRow from "./DisplayProductRow";
import { Product } from "../../../validations/productValidation";
import { FaPlus } from "react-icons/fa6";

interface Props {
  products: Product[];
}

export default function ProductsTable({ products }: Props) {
  
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
                <DisplayProductRow product={product} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex justify-content-center p-3 text-center">
        <Link
          to="/list-products/new"
          className="btn btn-outline-secondary w-50 fw-bold d-flex"
          style={{ borderRadius: "20px" }}
        >
          <FaPlus size="17px" style={{marginRight: '5px'}} /> Product
        </Link>
        <Link
          to="/admin-panel"
          style={{ borderRadius: "20px" }}
          className="btn btn-outline-primary w-50 fw-bold"
        >
          Admin Panel
        </Link>
      </div>
    </div>
  );
}
