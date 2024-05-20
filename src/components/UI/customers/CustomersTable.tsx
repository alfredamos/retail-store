import { Link } from "react-router-dom";
import CustomerDisplay from "./CustomerDisplay";
import { Customer } from "../../../validations/customerValidation";
import { FaPlus } from "react-icons/fa6";

interface Props {
  customers: Customer[];
}

export default function CustomersTable({ customers }: Props) {
  
  return (
    <div className="card h-auto w-auto">
      <div className="card-header bg-primary text-white p-3">
        <h4 className="text-center">Customer List</h4>
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
            {customers?.map((customer) => (
              <tr key={customer.id}>
                <CustomerDisplay customer={customer} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex  align-items-center justify-content-center p-3">
        <Link
          to="/customers/signup"
          className="btn btn-outline-secondary w-50 fw-bold d-flex"
          style={{ borderRadius: "20px" }}
        >
          <FaPlus size="17px" style={{marginRight: '5px'}}/> Customer
        </Link>
        <Link
          to="/admin-panel"
          className="btn btn-outline-primary w-50 fw-bold"
          style={{ borderRadius: "20px" }}
        >
          Admin Panel
        </Link>
      </div>
    </div>
  );
}
