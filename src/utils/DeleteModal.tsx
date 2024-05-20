import Modal from "../components/general/auth/Modal";

interface DeleteModalProp{
  deleteTitle: string;
  deleteMessage: string;
  deleteHandler: (value: boolean) => void;
}


export default function DeleteModal({deleteHandler, deleteMessage, deleteTitle}: DeleteModalProp) {
  return (
    <Modal>
      <hr />
      <div className="card-header" style={{ marginRight: "30px" }}>
        <h4 className="p-3 text-center">{deleteTitle}</h4>
      </div>
      <hr />
      <div className="card-body p-3 d-flex align-content-center justify-content-between p-5">
        <p
          className="text-muted text-justify"
          style={{ fontWeight: "200", fontSize: "1.2rem" }}
        >
          {deleteMessage}
        </p>
      </div>
      <hr />
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
      <hr />
      {/* <div className="card">
        <h4 className="text-center text-primary">{deleteTitle}</h4>
      </div>
      <hr />
      <div className="card-body">
        <div className="card-body text-center text-primary">          
          <p className="card-text lead" style={{fontSize: '3rem'}}>{deleteMessage}</p>
          <hr />
        </div>
        <div className="footer text-center mt-5">
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteHandler(true)}
          >
            Delete
          </button>
          <button
            className="btn btn-outline-warning"
            onClick={() => deleteHandler(false)}
          >
            Back
          </button>
        </div>
      </div> */}
    </Modal>
  );
}
