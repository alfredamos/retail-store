import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import UserRoleChangeForm from "../../../components/forms/auth/RoleChangeForm";
import { User } from "../../../validations/userValidation";
import Button from "../../../components/forms/formUtils/Button";

function MakeAdminView() {
  const user = useLoaderData() as User;

  const userId = useParams()?.id;
  const navigate = useNavigate();
  console.log("UserId: ", userId)

  const backToListHandler = () => {
    navigate(-1);
  }

  return (
    <UserRoleChangeForm userRole={user}>
      <Button
        type="button"
        className="btn btn-outline-secondary w-50 rounded-5 fw-bold"
        onClick={backToListHandler}
      >
        Back
      </Button>
    </UserRoleChangeForm>
  );
}

export default MakeAdminView