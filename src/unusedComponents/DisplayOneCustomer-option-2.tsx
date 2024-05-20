import { Customer } from "../validations/customerValidation";

interface Props {
  customer: Customer;
  onBackToList: () => void;
  deleteClickHandler: () => void;
}

export default function CustomerDisplayOne({
  customer,
  onBackToList,
  deleteClickHandler,
}: Props) {
  return (
    <div className="card d-flex flex-column mt-5">
      <h4 className="text-center">Customer Details</h4>
      <hr />
      <span className="d-flex justify-content-between text-muted">
        <span>Name</span>
        <span>{customer?.name}</span>
      </span>
      <hr />
      <span className="d-flex justify-content-between text-muted">
        <span>Street</span>
        <span>{customer?.street}</span>
      </span>
      <hr />
      <span className="d-flex justify-content-between text-muted">
        <span>City</span>
        <span>{customer?.city}</span>
      </span>
      <hr />
      <span className="d-flex justify-content-between text-muted">
        <span>State</span>
        <span>{customer?.state}</span>
      </span>
      <hr />
      <span className="d-flex justify-content-between text-muted">
        <span>PostCode</span>
        <span>{customer?.postCode}</span>
      </span>
      <hr />
      <span className="d-flex justify-content-between text-muted">
        <span>Country</span>
        <span>{customer?.country}</span>
      </span>
      <hr />
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-outline-secondary w-50 fw-bold"
          onClick={onBackToList}
          style={{ borderRadius: "20px" }}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-outline-danger w-50 fw-bold"
          onClick={deleteClickHandler}
          style={{ borderRadius: "20px" }}
        >
          Delete
        </button>
      </div>
      <hr />
    </div>
  );
}
