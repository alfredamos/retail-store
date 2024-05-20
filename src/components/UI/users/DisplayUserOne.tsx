import { UserDto } from "../../../models/userDto";

interface Props {
  user: UserDto;
  backToListHandler: () => void;
  deleteClickHandler: () => void;
}

export default function UserDisplayOne({
  user,
  backToListHandler,
  deleteClickHandler
}: Props) {
  
  
  return (
    <div className="col-sm-8 offset-2 mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="text-center">User Detail</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">Name : {user.name}</li>
            <li className="list-group-item">Email : {user.email}</li>
            <li className="list-group-item">Phone : {user.phone}</li>
          </ul>
        </div>
        <div className="card-footer">
          <button
            type="button"
            onClick={backToListHandler}
            className="btn-outline-secondary form-control text-center m-1 fw-bold"
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-outline-danger form-control fw-bold"
            onClick={deleteClickHandler}
            
          >
            Delete
          </button>
        </div>
      </div>
      
    </div>
  );
}
