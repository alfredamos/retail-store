import { useLoaderData, useNavigate } from "react-router-dom"
import CustomerForm from "../../components/forms/customer/customerForm"
import { Customer } from "../../validations/customerValidation"
import { CurrentUser } from "../../models/currentUser"

const initialCustomer: Customer = {
  name: "",
  street: "",
  city: "",
  state: "",
  postCode: "",
  country: "",
  userId: ""
}

function CreateCustomerView() {
  const currentUser = useLoaderData() as CurrentUser
  console.log({currentUser})
  const navigate = useNavigate();

  const backToListHandler = () => {
    navigate("/products");
  }
  return (
    <CustomerForm
      backToListHandler={backToListHandler}
      customer={{...initialCustomer, name: currentUser.name, userId: currentUser.id }}
      formName="Create"
    />
  );
}

export default CreateCustomerView