import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../features/authSlice";
import Modal from "../../components/general/auth/Modal";

export function LogoutView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  const backToLastPage = () => {
    navigate(-1);
  };

  return (
    <>
      <Modal>
        <div className="card-header">
          <h4 className="text-center">Logout Confirmation</h4>
        </div>
        <div className="card-body p-3 d-flex align-content-center justify-content-between p-5">
          <p className="lead">
            This is the logout page of the product center. PLease click the
            logout button below to log out otherwise click the cancel button to
            return to the previous page!
          </p>
        </div>
        <div className="card-footer bg-white p-4 d-flex justify-content-between w-100">
          <button
            onClick={backToLastPage}
            className="btn btn-outline-secondary btn-lg w-50 rounded-5 fw-bold p-2"
          >
            Back
          </button>
          <button
            className="btn btn-outline-primary btn-lg w-50 rounded-5 fw-bold p-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </Modal>
    </>
  );
}
