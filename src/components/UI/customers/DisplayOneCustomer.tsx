import { useLocation } from "react-router-dom";
import { Customer } from "../../../validations/customerValidation";

interface Props {
  customer: Customer;
  onBackToList: () => void;
  onDeleteClick: () => void;
}

function DisplayOneCustomerNew({
  customer,
  onBackToList,
  onDeleteClick,
}: Props) {
  const location = useLocation();
  const baseURL = location?.pathname?.split("/")[1];

  const classPicker = `${baseURL}` === "customers";
  console.log({ classPicker, baseURL });

  const firstName = (customer.name)?.split(" ")[0];
  return (
    <div className={`${classPicker? "card" : "card w-50 mx-auto"}`}>
      <div className="col-md-10 offset-1">
        <h4 className="text-center text-success">{customer.name}'s Details</h4>
        <hr />
        <article className="d-flex justify-content-between">
          <span>{firstName}</span>
          <span>
            Photo <img src="" alt="" />
          </span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Street</span>
          <span>{customer.street}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>City</span>
          <span>{customer.city}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>State</span>
          <span>{customer.state}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>PostCode</span>
          <span>{customer.postCode}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Country</span>
          <span>{customer.country}</span>
        </article>
        <hr />
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary w-50 fw-bold"
            style={{ borderRadius: "20px" }}
            onClick={onBackToList}
          >
            Back
          </button>
          <button
            className="btn btn-outline-danger w-50 fw-bold"
            style={{ borderRadius: '20px' }}
            onClick={onDeleteClick}
          >
            Delete
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default DisplayOneCustomerNew;
