import {Form, useLocation} from "react-router-dom";
import Input from "../formUtils/Input";
import Button from "../formUtils/Button";
import {ReactNode} from "react";
import { UserRole } from "../../../validations/userRoleChangeValidation";
import Select from "../formUtils/Select";

interface Props{
  userRole: UserRole ;
  children: ReactNode
}

export default function UserRoleChangeForm({children, userRole}: Props) {
  const location = useLocation();
  const baseURL = location?.pathname?.split("/")[1];

  const classPicker = baseURL === "roleChange" || baseURL === "admin-users" || baseURL === "admin-customers";
  
  return (
    <div
      className={`${
        classPicker ? "card border w-50 mx-auto" : "card border"
      }`}
    >
      <Form method="post">
        <div className="card-header">
          <h4 className="text-center">Role Change Form</h4>
        </div>
        <div className="card-body">
          <Input
            id="name"
            name="name"
            readOnly
            defaultValue={userRole.name}
            labelName="Name"
            type="text"
            className="form-control"
          />
          <Input
            id="email"
            name="email"
            labelName="Email"
            readOnly
            defaultValue={userRole.email}
            type="email"
            className="form-control"
          />
          <Input
            id="phone"
            name="phone"
            labelName="Phone"
            readOnly
            defaultValue={userRole.phone}
            type="tel"
            className="form-control"
          />
          <Select 
          id="gender" 
          labelName="Gender" 
          name="gender" 
          defaultValue={userRole.gender}
          className="form-select"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
          <Select 
          id="role" 
          labelName="Role" 
          name="role" 
          defaultValue={userRole.role}
          className="form-select"
          >
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
            <option value="Staff">Staff</option>
          </Select>
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
