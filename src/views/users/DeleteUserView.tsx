import {
  useNavigate,
  useLoaderData,
  useParams,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../features/userSlice";
import { useState } from "react";
import DeleteModal from "../../utils/DeleteModal";
import { User } from "../../validations/userValidation";
import { useDeleteUserById } from "../../hooks/users/useDeleteUserById";
import DisplayOneUser from "../../components/UI/users/DisplayOneUser";

function DeleteUserView() {
  const dispatch = useDispatch();
  const location = useLocation();
  const baseUrl = location?.pathname?.split("/")[1];

  const [showModal, setShowModal] = useState(false);
  const id = useParams()?.id as string;
  const navigate = useNavigate();

  const { mutateAsync } = useDeleteUserById(id);

  const nextRoutePicker = baseUrl === "users";

  const user = useLoaderData() as User;

  const backToListHandler = () => {
    navigate(-1);
  };

  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const deleteHandler = async (value: boolean) => {
    console.log({ value });
    if (value) {
      mutateAsync()
        .then(() => {
          dispatch(deleteUser({ id }));
          navigate(`${nextRoutePicker ? "/users" : "/admin-users"}`);
        })
        .catch((error) => console.log(error));
    } else {
      navigate(-1);
    }
  };
  return (
    <>
      <DisplayOneUser user={user}>
        <button
          type="button"
          className="btn btn-outline-secondary w-50 fw-bold"
          style={{ borderRadius: "20px" }}
          onClick={backToListHandler}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-outline-danger w-50 fw-bold"
          style={{ borderRadius: "20px" }}
          onClick={deleteClickHandler}
        >
          Delete
        </button>
      </DisplayOneUser>

      {showModal && (
        <DeleteModal
          deleteTitle="Delete User Confirmation!"
          deleteMessage={`Do you really want to delete this user : ${
            (user as User)?.name
          }?`}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default DeleteUserView;
