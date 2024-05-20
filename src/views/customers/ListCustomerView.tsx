import { Outlet, useLoaderData } from "react-router-dom";
import CustomersTable from "../../components/UI/customers/CustomersTable";
import { Customer } from "../../validations/customerValidation";
import { customersQuery } from "../../queries/customers/customersQuery";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomerLoader } from "../../routerActionsAndLoaders/customers/getAllCustomerLoader";

function ListCustomerView() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof getAllCustomerLoader>>
  >;
  const { data: customers } = useQuery({ ...customersQuery(), initialData });

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          <CustomersTable customers={customers as Customer[]} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ListCustomerView;
