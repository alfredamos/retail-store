import { useLoaderData } from "react-router-dom"
import UsersTable from "../../components/UI/users/UsersTable"
import { UserDto } from "../../models/userDto";

function ListUserView() {
  const users = useLoaderData() as UserDto[];
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <UsersTable 
          baseUrl="admin-users"
          users={users} />
        </div>       
      </div>
    </div>
  );
}

export default ListUserView