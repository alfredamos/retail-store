//import "../general/auth/logoutPanel.css"

interface ModalAlertProps{
  modalMessage: string;
  modalTitle: string;
  modalButtonHandler: (value: boolean) => void
}

function ModalAlert({modalButtonHandler, modalMessage, modalTitle}: ModalAlertProps) {
  const tabIndex = 1;
  return (
    <div className="backdrop" >
      <div className="modal-cover" tabIndex={tabIndex}>
        <div className="modal-dialog"> 
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => modalButtonHandler(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary fw-bold"
                onClick={() => modalButtonHandler(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary fw-bold"
                onClick={() => modalButtonHandler(true)}
              >
                Delete
              </button>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default ModalAlert