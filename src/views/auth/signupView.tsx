/* eslint-disable react-hooks/exhaustive-deps */
import { Signup } from "../../validations/signupValidation";
import SignupForm from "../../components/forms/auth/signupForm";
import Button from "../../components/forms/formUtils/Button";
import { useNavigate } from "react-router-dom";

const initialSignup: Signup = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  adminUser: {
    id: "",
    name: "",
    email: "",
    phone: "",
  },
};

function SignupView() {
  const navigate = useNavigate();

  const backToListHandler = () => {
    navigate(-1);
  };

  return (
    <SignupForm signup={initialSignup}>
      <Button
        type="button"
        className="btn btn-outline-secondary w-50 fw-bold"
        onClick={backToListHandler}
        style={{ borderRadius: "20px" }}
      >
        Back
      </Button>
    </SignupForm>
  );
}

export default SignupView;
