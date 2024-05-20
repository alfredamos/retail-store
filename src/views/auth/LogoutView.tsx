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
    <Modal>
      <hr/>
      <div
        className="card-header"
        style={{ marginRight: "30px" }}
      >
        <h4 className="p-3 text-center">Logout Page</h4>
      </div>
      <hr/>
      <div className="card-body p-3 d-flex align-content-center justify-content-between p-5">
        <p className="lead text-muted">
          This is the logout page of the retail product center. Please click the logout
          button below to log out otherwise click the cancel button to return to
          the previous page!
        </p>
      </div>
      <hr/>
      <div className="card-footer bg-white p-4 text-center d-flex">
        <button
          type="button"
          className="btn btn-outline-secondary w-50 fw-bold"
          onClick={backToLastPage}
          style={{ borderRadius: "20px" }}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-outline-primary w-50 fw-bold"
          onClick={handleLogout}
          style={{ borderRadius: "20px" }}
        >
          Logout
        </button>
      </div>
      <hr/>
    </Modal>
  );
}
