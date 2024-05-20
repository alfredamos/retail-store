import { Form } from "react-router-dom";
import Input from "../formUtils/Input";
import Button from "../formUtils/Button";
import { ChangePassword } from "../../../validations/changePasswordValidation";
import { ReactNode } from "react";

interface ChangePasswordFormProp {
  changePassword: ChangePassword;
  children: ReactNode;
}

export default function ChangePasswordForm({
  changePassword,
  children,
}: ChangePasswordFormProp) {
  return (
    <div className="card w-50 mx-auto mt-5">
      <Form method="post">
        <div className="card-header">
          <h4 className="text-center">Password Change Form</h4>
        </div>
        <div className="card-body">
          <Input
            id="email"
            name="email"
            labelName="Email"
            defaultValue={changePassword.email}
            type="email"
            disabled
            placeholder="Email"
            className="form-control"
          />
          <Input
            id="oldPassword"
            name="oldPassword"
            labelName="Old Password"
            type="password"
            required
            className="form-control"
          />
          <Input
            id="newPassword"
            name="newPassword"
            labelName="New Password"
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
