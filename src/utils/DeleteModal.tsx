import Modal from "../components/general/auth/Modal";

interface DeleteModalProp {
  deleteTitle: string;
  deleteMessage: string;
  deleteHandler: (value: boolean) => void;
}

export default function DeleteModal({
  deleteHandler,
  deleteMessage,
  deleteTitle,
}: DeleteModalProp) {
  return (
    <Modal>
      <div className="card-header bg-transparent d-flex justify-content-center align-content-center" >
        <h4 className="pb-4 fw-bold">{deleteTitle}</h4>
      </div>

      <div className="card-body p-3 d-flex align-content-center justify-content-between p-5">
        <p
          className="text-muted text-start"
          style={{ fontWeight: "200", fontSize: "1.2rem" }}
        >
          {deleteMessage}
        </p>
      </div>

      <div className="card-footer bg-white p-4 text-center d-flex">
        <button
          type="button"
          className="btn btn-outline-secondary w-50 fw-bold"
          onClick={() => deleteHandler(false)}
          style={{ borderRadius: "20px" }}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-outline-danger w-50 fw-bold"
          onClick={() => deleteHandler(true)}
          style={{ borderRadius: "20px" }}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
