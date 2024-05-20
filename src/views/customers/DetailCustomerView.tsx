import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import DisplayOneCustomerNew from "../../components/UI/customers/DisplayOneCustomer"
import { useQuery } from "@tanstack/react-query";
import { customerOneQuery } from "../../queries/customers/customerOneQuery";
import { getOneCustomerLoader } from "../../routerActionsAndLoaders/customers/getOneCustomerLoader";
import { Customer } from "../../validations/customerValidation";
import { useState } from "react";
import DeleteModal from "../../utils/DeleteModal";
import { useDeleteCustomer } from "../../hooks/customers/useDeleteCustomer";
import { toast } from "react-toastify";


function DetailCustomerView() {
  const [showModal, setShowModal] = useState(false);
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof getOneCustomerLoader>>>;
  const {id} = useParams();

  const {data: customer} = useQuery({...customerOneQuery(id!), initialData});
  const {mutateAsync} = useDeleteCustomer(id!)

  const navigate = useNavigate();
  
  const backToListHandler = () => {
    navigate("/customers");
  }

  const deleteClickHandler = () => {
    setShowModal(true)
  }

  const deleteHandler = (value: boolean) => {
    if (value){
      mutateAsync()
        .then(() => {
          toast.success(
            `The customer : ${
              (customer as Customer).name
            } has been deleted successfully!`
          );
          navigate("/customers");
        })
        .catch((error) => console.log(error));
    }else{
      navigate("/customers") 
    }
  }

  return (
    <>
      <DisplayOneCustomerNew
        customer={customer as Customer}
        onBackToList={backToListHandler}
        onDeleteClick={deleteClickHandler}
      />
      {
        showModal &&
        <DeleteModal
        deleteTitle="Customer Delete Confirmation!"
        deleteMessage={`Do you really want to delete this customer : ${(customer as Customer)?.name}?`}
        deleteHandler={deleteHandler}
        />
      }
    </>
  );
}

export default DetailCustomerView