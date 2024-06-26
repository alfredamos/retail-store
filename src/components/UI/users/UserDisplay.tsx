import { Link } from "react-router-dom";
import { UserDto } from "../../../models/userDto";

interface Props {
  user: UserDto;
  baseUrl: string;
}

export default function UserDisplay({ baseUrl, user }: Props) {
  
  return (
    <>
      <td className="text-start">{user.name}</td>
      <td>
        <Link
          to={`/${baseUrl}/detail/${user?.id}`}
          className="stretch-link text-primary fw-bold m-3"
        >
          View
        </Link>
        <Link
          to={`/${baseUrl}/delete/${user?.id}`}
          className="stretch-link text-danger m-3 fw-bold"
        >
          Delete
        </Link>
        <Link
          to={`/${baseUrl}/edit/${user?.id}`}
          className="stretch-link text-secondary m-3 fw-bold"
        >
          Edit
        </Link>
        <Link
          to={`/${baseUrl}/make-admin/${user?.id}`}
          className="stretch-link text-dark m-3 fw-bold"
        >
          Role
        </Link>
      </td>
    </>
  );
}
