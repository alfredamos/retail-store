import { useNavigate, useLoaderData, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../features/userSlice";
import { userService } from "../../APIRoutes/userRoute";
import { useState } from "react";
import DeleteModal from "../../utils/DeleteModal";
import { User } from "../../validations/userValidation";
import DisplayOneUser from "../../components/UI/users/DisplayOneUser";

function DetailUserView() {
  const dispatch = useDispatch();
  const location = useLocation();
  const baseUrl = location?.pathname?.split('/')[1];

  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const user = useLoaderData() as User;
  const navigate = useNavigate();

  const backToList = () => {
    navigate(-1);
  };
  
  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const nextRoutePicker = baseUrl === "users"

  const deleteHandler = async (value: boolean) => {
    if (value) {
      if (id) {
        dispatch(deleteUser({ id }));
        await userService.remove(id);
      }
      navigate(`${nextRoutePicker? "/users" : "/admin-users"}`);
    } else {
      navigate(-1);
    }
  };
  return (
    <>
    
      <DisplayOneUser
      user ={user}
      onDeleteClick={deleteClickHandler}
      onBackToList={backToList}
      />
    
      {showModal && (
        <DeleteModal
          deleteTitle="Delete User Confirmation!"
          deleteMessage={`Do you really want to delete this user : ${(user as User)?.name}?`}
          deleteHandler={deleteHandler}
        />
      )}
      </>
  );
}

export default DetailUserView;
