import { useNavigate } from "react-router-dom";
import { Login } from "../../validations/loginValidation";
import LoginForm from "../../components/forms/auth/LoginForm";
import Button from "../../components/forms/formUtils/Button";
import { useAuth } from "../../hooks/auth/useAuth";

const initialLogin: Login = {
  email: "",
  password: "",
};

function LoginView() {
  const navigate = useNavigate();
  const userId = useAuth()?.currentUser?.id;


  const backToListHandler = () => {
    navigate(`/profiles/${userId}`);
  };

  return (
    <LoginForm login={initialLogin}>
      <Button
        type="button"
        className="btn btn-outline-secondary w-50
         fw-bold"
        onClick={backToListHandler}
        style={{ borderRadius: "20px" }}
      >
        Back
      </Button>
    </LoginForm>
  );
}

export default LoginView;
