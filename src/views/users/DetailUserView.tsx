import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../features/userSlice";
import { userService } from "../../APIRoutes/userRoute";
import { useState } from "react";
import DeleteModal from "../../utils/DeleteModal";
import { User } from "../../validations/userValidation";
import DisplayOneUser from "../../components/UI/users/DisplayOneUser";
import { useQuery } from "@tanstack/react-query";
import { userOneQuery } from '../../queries/users/userOneQuery';
import { getOneUserLoader } from "../../routerActionsAndLoaders/users/getOneUserLoader";

function DetailUserView() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof getOneUserLoader>>>;
  const {data: user, isSuccess} = useQuery({...userOneQuery(id as string), initialData})
  const navigate = useNavigate();
  console.log({isSuccess, user})
  const backToList = () => {
    navigate("/users");
  };

  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const deleteHandler = async (value: boolean) => {
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
    {
      isSuccess &&
      <DisplayOneUser
      user ={user as User}
      onDeleteClick={deleteClickHandler}
      onBackToList={backToList}
      />
    }
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
