import { Link } from "react-router-dom";
import UserDisplay from "./UserDisplay";
import { UserDto } from "../../../models/userDto";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";

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
          <FaPlus
            size="15px"
            style={{ marginRight: "5px", alignSelf: "center" }}
          />{" "}
          User
        </Link>
        <Link
          to={`${routePicker ? "/admin-panel" : "/admin-main-panel"}`}
          className="btn btn-outline-primary w-50 fw-bold rounded-5"
        >
          <FaArrowLeft
            size="15px"
            style={{
              marginRight: "5px",
              alignSelf: "center",
              fontWeight: "bold",
            }}
          />
          Admin
        </Link>
      </div>
    </div>
  );
}
