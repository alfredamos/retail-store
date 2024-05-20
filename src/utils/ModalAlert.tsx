import Modal from "../components/general/auth/Modal";

interface Props {
  modalMessage: string;
  modalTitle: string;
  modalButtonHandler: (value: boolean) => void;
}

export function AlertModal({
  modalButtonHandler,
  modalMessage,
  modalTitle,
}: Props) {
  const tabIndexInt: number = -1;
  return (
    <>
      <Modal>
        <span
          id="exampleModal"
          tabIndex={tabIndexInt}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title" id="exampleModalLabel">
                  {modalTitle}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-light"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => modalButtonHandler(false)}
                ></button>
              </div>
              <div className="modal-body">{modalMessage}</div>
              <div className="modal-footer d-flex justify-content-start">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => modalButtonHandler(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-dismiss="modal"
                  onClick={() => modalButtonHandler(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </span>
      </Modal>
    </>
  );
}
