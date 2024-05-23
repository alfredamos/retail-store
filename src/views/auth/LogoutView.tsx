import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../features/authSlice";
import { AlertModal } from "../../utils/AlertModal";

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
      <div className="row mt-5">
        <div className="col col-sm-6 offset-3">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h4 className="text-center p-3">Logout Page</h4>
            </div>
            <div className="card-body p-3 d-flex align-content-center justify-content-between p-5">
              <p className="lead">
                This is the logout page of the product center. PLease click the
                logout button below to log out otherwise click the cancel button
                to return to the previous page!
              </p>
            </div>
            <div className="card-footer bg-white p-4">
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-outline-secondary btn-lg form-control fw-bold p-2"
              >
                Logout
              </button>
              <button
                onClick={backToLastPage}
                className="btn btn-outline-primary btn-lg form-control fw-bold p-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <AlertModal
        modalButtonClose="Back"
        modalButtonHandler={handleLogout}
        modalButtonSave="Logout"
        modalMessage="Do you really want to Logout?"
        modalTitle="Logout Confirmation!"
      />
    </>
  );
}
