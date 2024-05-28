import { useLoaderData } from "react-router-dom";
import CustomersTable from "../../components/UI/customers/CustomersTable";
import { Customer } from "../../validations/customerValidation";

function ListCustomerView() {
  const customers = useLoaderData() as Customer[];

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <CustomersTable 
          baseUrl="admin-customers"
          customers={customers as Customer[]}
           />
        </div>
      </div>
    </div>
  );
}

export default ListCustomerView;
