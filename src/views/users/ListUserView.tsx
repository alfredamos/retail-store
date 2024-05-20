import { Outlet, useLoaderData } from "react-router-dom"
import UsersTable from "../../components/UI/users/UsersTable"
import { useQuery } from "@tanstack/react-query";
import { UserDto } from "../../models/userDto";
import { getAllUserLoader } from "../../routerActionsAndLoaders/users/getAllUserLoader";
import { usersQuery } from "../../queries/users/usersQuery";

function ListUserView() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof getAllUserLoader>>>;

  const {data: users} = useQuery({...usersQuery(), initialData})
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          <UsersTable users={users as UserDto[]} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ListUserView