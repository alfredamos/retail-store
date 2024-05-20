import { useNavigate } from "react-router-dom";
import Button from "../../components/forms/formUtils/Button";
import { useAuth } from "../../hooks/auth/useAuth";
import ChangePasswordForm from "../../components/forms/auth/passwordChangeForm";

function PasswordChangeView() {
  const navigate = useNavigate();
  const authData = useAuth().currentUser!;

  const backToListHandler = () => {
    navigate("/home");
  };

  return (
    <ChangePasswordForm
      changePassword={{
        email: authData?.email,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
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
    </ChangePasswordForm>
  );
}

export default PasswordChangeView;
