import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import DisplayOneCustomerNew from "../../components/UI/customers/DisplayOneCustomer";
import { Customer } from "../../validations/customerValidation";
import { useState } from "react";
import DeleteModal from "../../utils/DeleteModal";
import { useDeleteCustomer } from "../../hooks/customers/useDeleteCustomerId";
import { toast } from "react-toastify";

function DetailCustomerView() {
  const [showModal, setShowModal] = useState(false);
  const customer = useLoaderData() as Customer;
  const id = useParams()?.id as string;

  const location = useLocation();

  const { mutateAsync } = useDeleteCustomer(id);

  const baseURL = location?.pathname?.split("/")[1];

  const nextRoutePicker = baseURL === "customers";

  const navigate = useNavigate();

  const backToListHandler = () => {
    navigate(-1);
  };

  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const deleteHandler = (value: boolean) => {
    if (value) {
      mutateAsync()
        .then(() => {
          toast.success(
            `The customer : ${customer.name} has been deleted successfully!`
          );
          navigate(`${nextRoutePicker ? "/customers" : "/admin-customers"}`);
        })
        .catch((error) => console.log(error));
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <DisplayOneCustomerNew
        customer={customer}
        onBackToList={backToListHandler}
        onDeleteClick={deleteClickHandler}
      />
      {showModal && (
        <DeleteModal
          deleteTitle="Customer Delete Confirmation!"
          deleteMessage={`Do you really want to delete this customer : ${customer?.name}?`}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default DetailCustomerView;
