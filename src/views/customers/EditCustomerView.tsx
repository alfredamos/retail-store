import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import CustomerForm from "../../components/forms/customer/customerForm";
import { Customer } from "../../validations/customerValidation";
import { customerOneQuery } from "../../queries/customers/customerOneQuery";
import { useQuery } from "@tanstack/react-query";
import { getOneCustomerLoader } from "../../routerActionsAndLoaders/customers/getOneCustomerLoader";

function EditCustomerView() {
  const { id } = useParams();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof getOneCustomerLoader>>
  >;
  const { data: customer } = useQuery({
    ...customerOneQuery(id!),
    initialData,
  });
  console.log("In edit customer, customer : ", customer);
  const navigate = useNavigate();

  const backToListHandler = () => {
    navigate("/customers");
  };
  return (
    <CustomerForm
      backToListHandler={backToListHandler}
      customer={customer as Customer}
      formName="Edit"
    />
  );
}

export default EditCustomerView;
