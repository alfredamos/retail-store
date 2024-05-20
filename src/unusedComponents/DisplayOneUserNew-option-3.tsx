import { User } from "../validations/userValidation";

interface DisplayOneUserNewProps {
  user: User;
  onDeleteClick: () => void;
  onBackToList: () => void;
}

function DisplayOneUserNew2({
  user,
  onBackToList,
  onDeleteClick,
}: DisplayOneUserNewProps) {
  const firstName = user.name.split(" ")[0];
  return (
    <div className="card mt-5">
      <div className="col-md-10 offset-md-1">
        <h4 className="text-center text-success">{firstName}'s Details</h4>
        <hr />
        <article className="d-flex justify-content-between">
          <span>{firstName}</span>
          <span>
            Photo <img src="" alt="" />
          </span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Email</span>
          <span>{user.email}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Phone</span>
          <span>{user.phone}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Full Name</span>
          <span>{user.name}</span>
        </article>
        <hr />
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary w-50 fw-bold"
            style={{ borderRadius: "20px" }}
            onClick={onBackToList}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-outline-danger w-50 fw-bold"
            style={{ borderRadius: "20px" }}
            onClick={onDeleteClick}
          >
            Delete
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default DisplayOneUserNew2;
