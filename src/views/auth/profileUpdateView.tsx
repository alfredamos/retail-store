import { useNavigate, useLoaderData } from "react-router-dom";
import Button from "../../components/forms/formUtils/Button";
import { CurrentUser } from "../../models/currentUser";
import ProfileUpdateForm from "../../components/forms/auth/profileUpdateForm";
import { useAuth } from "../../hooks/auth/useAuth";

function ProfileUpdateView() {
  const isAdmin = useAuth()?.isAdmin
  const navigate = useNavigate();
  const currentUser = useAuth().currentUser;
  const data = useLoaderData as unknown as CurrentUser;
  console.log({ currentUser2: data });
  console.log({ currentUser });
  const backToListHandler = () => {
    navigate(`${isAdmin ? "/users" : -1}`);
  };

  return (
    <ProfileUpdateForm
      profileUpdate={{
        name: currentUser?.name,
        email: currentUser?.email,
        phone: currentUser?.phone,
        password: "",
      }}
    >
      <Button
        type="button"
        className="btn btn-outline-secondary w-50 fw-bold"
        onClick={backToListHandler}
        style={{ borderRadius: "20px" }}
      >
        Back
      </Button>
    </ProfileUpdateForm>
  );
}

export default ProfileUpdateView;
