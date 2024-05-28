import { Link} from "react-router-dom";
import CustomerDisplay from "./CustomerDisplay";
import { Customer } from "../../../validations/customerValidation";
import { FaArrowLeft, FaPlus } from 'react-icons/fa6';

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
          to="/customers/signup"
          className="btn btn-outline-secondary w-50 fw-bold d-flex rounded-5"
        >
          <FaPlus
            size="15px"
            style={{ marginRight: "5px", alignSelf: "center", fontWeight: 'bold' }}
          />
          Customer
        </Link>
        <Link
          to={`${routePicker ? "/admin-panel" : "/admin-main-panel"}`}
          className="btn btn-outline-primary w-50 fw-bold rounded-5"
        >
          <FaArrowLeft 
          size="15px"
          style={{marginRight: '5px', alignSelf: 'center', fontWeight: 'bold'}}
          />Admin
        </Link>
      </div>
    </div>
  );
}
