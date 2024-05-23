import { createPortal } from "react-dom";
import "./logoutPanel.css";

interface LogOutPanelProps {
  modalMessage?: string;
  modalTitle?: string;
  modalButtonSave?: string;
  handleLogout: () => void;
  backToLastPage: () => void;
}

function LogOutPanel({
  backToLastPage,
  handleLogout,
  modalMessage,
  modalTitle,
  modalButtonSave,
}: LogOutPanelProps) {
  return createPortal(
    <div className="backdrop">
      <div className="card border h-auto">
        <div
          className="card-header bg-light text-dark"
          style={{ marginRight: "30px" }}
        >
          <h4 className="text-center p-3 fw-bold">
            {modalTitle ? modalTitle : `Logout Page`}
          </h4>
        </div>
        <div className="card-body p-3 d-flex align-content-center justify-content-between p-5">
          <p className="lead">
            {modalMessage
              ? modalMessage
              : `This is the logout page of the product center. PLease click the
            logout button below to log out otherwise click the cancel button to
            return to the previous page!`}
          </p>
        </div>
        <div className="card-footer bg-white p-4 d-flex justify-content-between w-100">
          <button
            type="button"
            className="btn btn-outline-secondary rounded-4 fw-bold w-50"
            onClick={backToLastPage}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-outline-primary rounded-4 fw-bold w-50"
            onClick={handleLogout}
          >
            {modalButtonSave ? modalButtonSave : `Logout`}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default LogOutPanel;
