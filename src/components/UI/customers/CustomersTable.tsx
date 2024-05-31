import { Link} from "react-router-dom";
import CustomerDisplay from "./CustomerDisplay";
import { Customer } from "../../../validations/customerValidation";
import { TiUserAddOutline } from "react-icons/ti";
import { GrUserAdmin } from "react-icons/gr";

interface Props {
  customers: Customer[];
  baseUrl: string;
}

export default function CustomersTable({ baseUrl,customers }: Props) {
  const routePicker = baseUrl === "customers";
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
                <CustomerDisplay baseUrl={baseUrl} customer={customer} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex  align-items-center justify-content-center p-3">
        <Link
          to="/admin-customers/signup"
          className="btn btn-outline-secondary w-50 fw-bold d-flex rounded-5"
        >
          <TiUserAddOutline 
          
          size="20px" 
          /> Customer
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
