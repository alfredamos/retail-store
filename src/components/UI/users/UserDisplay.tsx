import { Link } from "react-router-dom";
import { UserDto } from "../../../models/userDto";

interface Props {
  user: UserDto;
}

export default function UserDisplay({ user }: Props) {
  
  return (
    <>
      <td className="text-start">{user.name}</td>
      <td>
        <Link
          to={`/users/detail/${user?.id}`}
          className="stretch-link text-primary fw-bold m-3"
        >
          View
        </Link>
        <Link
          to={`/users/delete/${user?.id}`}
          className="stretch-link text-danger m-3 fw-bold"
        >
          Delete
        </Link>
        <Link
          to={`/users/edit/${user?.id}`}
          className="stretch-link text-secondary m-3 fw-bold"
        >
          Edit
        </Link>
        <Link
          to={`/users/make-admin/${user?.id}`}
          className="stretch-link text-dark m-3 fw-bold"
        >
          Role
        </Link>
      </td>
    </>
  );
}
