import { Outlet, useLoaderData } from "react-router-dom";
import CustomersTable from "../../components/UI/customers/CustomersTable";
import { Customer } from "../../validations/customerValidation";

function ListCustomerView() {
  const customers = useLoaderData() as Customer[];

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <CustomersTable 
          baseUrl="customers"
          customers={customers} 
          />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ListCustomerView;
