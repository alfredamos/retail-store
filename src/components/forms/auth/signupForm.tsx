import {Form, useLocation} from "react-router-dom";
import Input from "../formUtils/Input";
import Button from "../formUtils/Button";
import {ReactNode} from "react";
import { Signup} from "../../../validations/signupValidation";

interface SignupFormProp{
  signup: Signup;
  children: ReactNode
}

export default function SignupForm({children}: SignupFormProp) {
  const location = useLocation();
  const baseURL = location?.pathname?.split("/")[1];

  const classPicker = baseURL === "signup" || baseURL === "admin-users";
  
  return (
    <div
      className={`${
        classPicker ? "card border w-50 mx-auto" : "card border"
      }`}
    >
      <Form method="post">
        <div className="card-header">
          <h4 className="text-center">Signup Form</h4>
        </div>
        <div className="card-body">
          <Input
            id="name"
            name="name"
            labelName="Name"
            required
            type="text"
            className="form-control"
          />
          <Input
            id="email"
            name="email"
            labelName="Email"
            type="email"
            required
            className="form-control"
          />
          <Input
            id="phone"
            name="phone"
            labelName="Phone"
            type="tel"
            required
            className="form-control"
          />
          <Input
            id="password"
            name="password"
            labelName="Password"
            type="password"
            required
            className="form-control"
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            labelName="Confirm Password"
            type="password"
            required
            className="form-control"
          />
        </div>
        <div className="card-footer d-flex justify-content-between">
          {children}
          <Button
            type="submit"
            className="btn btn-outline-primary w-50 rounded-5 fw-bold"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
