import { Link } from "react-router-dom";
import UserDisplay from "./UserDisplay";
import { UserDto } from "../../../models/userDto";
import { RiUserShared2Line } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";

interface Props {
  users: UserDto[];
  baseUrl: string;
}

export default function UsersTable({ baseUrl, users }: Props) {
  const routePicker = baseUrl === "users";
  return (
    <div className="card h-auto w-auto">
      <div className="card-header bg-primary text-white p-3">
        <h4 className="text-center">User List</h4>
      </div>
      <div className="card-body">
        <table className="table table-responsive table-striped table-bordered">
          <thead>
            <tr>
              <th className="fw-bold">Name</th>
              <th className="fw-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <UserDisplay baseUrl={baseUrl} user={user} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex align-items-center justify-content-center p-3">
        <Link
          to={`/${baseUrl}/signup`}
          className="btn btn-outline-secondary w-50 fw-bold d-flex rounded-5"
        >
          <RiUserShared2Line size="20px" style={{ display: "flex" }} />User
        </Link>
        <Link
          to={`${routePicker ? "/admin-panel" : "/admin-main-panel"}`}
          className="btn btn-outline-primary w-50 fw-bold rounded-5"
        >
          <GrUserAdmin size="20px"/>Admin
        </Link>
      </div>
    </div>
  );
}
