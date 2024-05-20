import { Form } from "react-router-dom";
import Input from "../formUtils/Input";
import Button from "../formUtils/Button";
import { ReactNode } from "react";
import { EditProfile } from "../../../validations/editProfileValidation";

interface ProfileUpdateFormProp {
  profileUpdate: EditProfile;
  children: ReactNode;
}

export default function ProfileUpdateForm({
  profileUpdate,
  children,
}: ProfileUpdateFormProp) {
  return (
    <div className="card mt-5">
      <Form method="post">
        <div className="card-header">
          <h4 className="text-center">Profile Update Form</h4>
        </div>
        <div className="card-body">
          <Input
            id="name"
            name="name"
            defaultValue={profileUpdate.name}
            labelName="Name"
            type="text"
            required
            className="form-control"
          />
          <Input
            id="email"
            name="email"
            defaultValue={profileUpdate.email}
            disabled
            labelName="Email"
            type="email"
            className="form-control"
          />
          <Input
            id="phone"
            name="phone"
            defaultValue={profileUpdate.phone}
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
