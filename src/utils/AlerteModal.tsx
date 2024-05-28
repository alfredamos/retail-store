import { createPortal } from "react-dom";

interface Props{
  modalTitle: string;
  modalMessage: string;
  modalButtonClose: string;
  modalButtonSave: string;
  modalButtonHandler: (value: boolean) => void
}


function AlerteModal({
   modalButtonClose, 
   modalButtonHandler,
   modalButtonSave,
   modalMessage,modalTitle 
  }: Props) {
  //const tabIndex = 1;

  return createPortal(
    <div className="overlay">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-white">
          <div className="modal-header bg-primary text-white d-flex justify-content-between p-2">
            <h5 className="modal-title p-2" id="exampleModalLabel">
              {modalTitle}
            </h5>
            <button
              type="button"
              className="btn-close btn-light"             
              aria-label="Close"
              onClick={() => modalButtonHandler(false)}
            ></button>
          </div>
          <div className="modal-body text-start p-5">{modalMessage}</div>
          <hr />
          <div className="d-flex justify-content-between align-content-center w-100 mb-2 p-2">            
            <button
              type="button"
              className="btn btn-outline-secondary rounded-5 fw-bold w-50"            
              onClick={() => modalButtonHandler(false)}
            >
              {modalButtonClose}
            </button>
            <button
              type="button"
              className="btn btn-outline-primary rounded-5 fw-bold w-50"            
              onClick={() => modalButtonHandler(true)}
              style={{alignContent: 'end'}}
            >
              {modalButtonSave}
            </button>
          </div>
          <hr />
        </div>
      </div>    
    </div>,
    document.body
  );
}

export default AlerteModal;

