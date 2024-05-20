import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import { UserDto } from "../models/userDto";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/userSlice";
import { userService } from "../APIRoutes/userRoute";
import { useState } from "react";
import DisplayUserOne from "../components/UI/users/DisplayUserOne";
import DeleteModal from "../utils/DeleteModal";

function DetailUserView() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const data = useLoaderData() as UserDto;
  const navigate = useNavigate();

  const backToList = () => {
    navigate("/users");
  };

  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const deleteHandler = async (value: boolean) => {
    console.log({ value });
    if (value) {
      if (id) {
        dispatch(deleteUser({ id }));
        await userService.remove(id);
      }
      navigate("/users");
    } else {
      navigate("/users");
    }
  };
  return (
    <>
      <DisplayUserOne
        user={data}
        backToListHandler={backToList}
        deleteClickHandler={deleteClickHandler}
      />
      {showModal && (
        <DeleteModal
          deleteTitle="Delete User Confirmation"
          deleteMessage={`Do you really want to delete this user : ${data?.name}?`}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default DetailUserView;
