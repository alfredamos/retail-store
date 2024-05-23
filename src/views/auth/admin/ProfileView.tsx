import { Link } from "react-router-dom";
import { BsBasket} from "react-icons/bs"; //BsPencilSquare
import {BiLogOut} from "react-icons/bi";
import {FaProductHunt} from "react-icons/fa6";
import {RiLockPasswordFill} from "react-icons/ri"
import { CgProfile } from "react-icons/cg";
import { useGetCustomerDBOrders } from "../../../hooks/orders/useGetCustomerDBOrders";

function ProfileView() {
  const {orders} = useGetCustomerDBOrders();
  console.log({orders})
  return (
    <div className="row">
      <div className="col-2 sidebar">
        <h4 className="text-start mb-5">Sidebar</h4>
        <div className="text-start mb-5 fw-bold">
          <Link to="/change-password" className="stretch-link text-secondary">
            <RiLockPasswordFill color="white" size="30px"/>
          </Link>
        </div>
        <div className="text-start mb-5 fw-bold">
          <Link to="/edit-profile" className="stretch-link text-secondary">
            <CgProfile color="white" size="30px"/>
          </Link>
        </div>
        <div className="text-start mb-5 fw-bold">
          <Link to="/logout" className="stretch-link text-secondary">
            <BiLogOut color="white" size="30px"/>
          </Link>
        </div>
        <div className="text-start mb-5 fw-bold">
          <Link to="/orders" className="stretch-link text-secondary">
            <BsBasket color="white" size="30px"/>
          </Link>
        </div>
        <div className="text-start mb-5 fw-bold">
          <Link to="/products" className="stretch-link text-secondary">
            <FaProductHunt color="white" size="30px"/>
          </Link>
        </div>
      </div>
      <div className="col-10">
        
      </div>
    </div>
  );
}

export default ProfileView;
