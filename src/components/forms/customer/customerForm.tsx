import { Form, useLocation } from "react-router-dom";
import { Customer} from "../../../validations/customerValidation";
import Input from "../formUtils/Input";


interface CustomerFormProps {
  formName: string;
  customer: Customer;
  backToListHandler: () => void;
}

function CustomerForm({
  formName,
  backToListHandler,
  customer,
}: CustomerFormProps) {
  const location = useLocation();
  const baseURL = location?.pathname?.split('/')[1];

  const classPicker = baseURL === "customers";

  return (
    <div className={`${classPicker ? "card" : "card w-50 mx-auto"}`}>
      <Form method="post">
        <div className="card-header">
          <h4 className="text-center">{formName} Customer Form</h4>
          <p>{formName === "Create" && "Please provide additional info"}</p>
        </div>
        <div className="card-body">
          <Input
            id="name"
            labelName=""
            name="name"
            hidden
            type="text"
            required
            defaultValue={customer.name}
            className="form-control"
          />
          <Input
            id="street"
            labelName="Street"
            name="street"
            type="text"
            required
            defaultValue={customer.street}
            className="form-control"
          />
          <Input
            id="city"
            labelName="city"
            name="city"
            type="text"
            required
            defaultValue={customer.city}
            className="form-control"
          />
          <Input
            id="state"
            labelName="state"
            name="state"
            type="text"
            required
            defaultValue={customer.state}
            className="form-control"
          />
          <Input
            id="postCode"
            labelName="Post Code"
            name="postCode"
            type="text"
            required
            defaultValue={customer.postCode}
            className="form-control"
          />
          <Input
            id="country"
            labelName="Country"
            name="country"
            type="text"
            required
            defaultValue={customer.country}
            className="form-control"
          />
          <Input
            id="userId"
            name="userId"
            labelName=""
            type="text"
            hidden
            defaultValue={customer.userId}
            className="form-control"
          />
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary w-50 fw-bold"
            onClick={backToListHandler}
            style={{ borderRadius: "20px" }}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn btn-outline-primary w-50 fw-bold"
            style={{ borderRadius: "20px" }}
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CustomerForm;
