import { User } from "../validations/userValidation";

interface DisplayOneUserNewProps{
  user: User;
  onDeleteClick: () => void;
  onBackToList: () => void;
}

function DisplayOneUserNew({user, onDeleteClick, onBackToList}: DisplayOneUserNewProps) {
  const firstName = (user.name).split(" ")[0];
  return (
    <div className="card mt-5">
      <h4 className="text-center">User Details</h4>
      <hr />
      <div className="d-flex flex-column">
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
            className="btn btn-outline-secondary fw-bold w-50"
            onClick={onBackToList}
            style={{ borderRadius: "20px" }}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-outline-danger fw-bold w-50"
            onClick={onDeleteClick}
            style={{ borderRadius: "20px" }}
          >
            Delete
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default DisplayOneUserNew