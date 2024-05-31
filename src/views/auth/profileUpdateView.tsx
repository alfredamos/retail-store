import { useLoaderData, useNavigate} from "react-router-dom";
import Button from "../../components/forms/formUtils/Button";
import ProfileUpdateForm from "../../components/forms/auth/profileUpdateForm";
import { User } from "../../validations/userValidation";
import { useAuth } from "../../hooks/auth/useAuth";

function ProfileUpdateView() {
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  const user = useLoaderData() as User ?? currentUser;
 
  console.log({ user });
  const backToListHandler = () => {
    navigate(-1);
  };

  return (
    <ProfileUpdateForm
      profileUpdate={{
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
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
