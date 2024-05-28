import { useNavigate, useLoaderData } from 'react-router-dom';
import CustomerForm from "../../components/forms/customer/customerForm"
import { Customer } from "../../validations/customerValidation"
import { UserResponse } from '../../models/userResponse';

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
  const currentUser = useLoaderData() as UserResponse;

  const navigate = useNavigate();
  
  const backToListHandler = () => {
    navigate(-1);
  }
  return (
    <CustomerForm
      backToListHandler={backToListHandler}
      customer={{...initialCustomer, name: currentUser?.name, userId: currentUser?.id}}
      formName="Create"
    />
  );
}

export default CreateCustomerView