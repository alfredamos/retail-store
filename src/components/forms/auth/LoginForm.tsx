import { Form } from "react-router-dom";
import Input from "../formUtils/Input";
import Button from "../formUtils/Button";
import { Login } from "../../../validations/loginValidation";
import { ReactNode } from "react";

interface LoginFormProp {
  login: Login;
  children: ReactNode;
}

export default function LoginForm({ children }: LoginFormProp) {
  return (
    <div className="card card-border-primary shadow-lg text-black w-50 mx-auto mt-5">
      <Form method="post">
        <div className="card-header border-light">
          <h4 className="text-center">Login Form</h4>
        </div>
        <div className="card-body">
          <Input
            id="email"
            name="email"
            labelName="Email"
            type="email"
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
        </div>
        <div className="card-footer d-flex justify-content-between">
          {children}
          <Button
            type="submit"
            className="btn btn-outline-primary w-50 fw-bold"
            style={{ borderRadius: "20px" }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
