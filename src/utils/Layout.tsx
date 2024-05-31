import { Link, Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { BiLogOut } from "react-icons/bi";
import { BsBasket } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaProductHunt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAuth } from "../hooks/auth/useAuth";
import { GrUserAdmin } from "react-icons/gr";
import { ImProfile } from "react-icons/im";

function Layout() {
  const { isLoggedIn, isAdmin, currentUser } = useAuth();
  return (
    <>
      <NavBar />

      <div className="row">
        {isLoggedIn && (
          <div
            className="col-2 col-sm-2 col-container sidebar"
            style={{ columnFill: "balance" }}
          >
            <h4 className="text-start mb-5">Sidebar</h4>
            <div className="text-start mb-5 fw-bold">
              <Link
                to="/change-password"
                className="stretch-link text-secondary"
              >
                <RiLockPasswordFill color="white" size="30px" />
              </Link>
            </div>
            <div className="text-start mb-5 fw-bold">
              <Link to="/edit-profile" className="stretch-link text-secondary">
                <CgProfile color="white" size="30px" />
              </Link>
            </div>
            <div className="text-start mb-5 fw-bold">
              <Link to="/logout" className="stretch-link text-secondary">
                <BiLogOut color="white" size="30px" />
              </Link>
            </div>
            <div className="text-start mb-5 fw-bold">
              <Link to="/orders" className="stretch-link text-secondary">
                <BsBasket color="white" size="30px" />
              </Link>
            </div>
            <div className="text-start mb-5 fw-bold">
              <Link to="/products" className="stretch-link text-secondary">
                <FaProductHunt color="white" size="30px" />
              </Link>
            </div>
            <div className="text-start mb-5 fw-bold">
              <Link to={`/profiles/${currentUser?.id}`} className="stretch-link text-secondary">
                <ImProfile color="white" size="30px" />
              </Link>
            </div>
            {isAdmin && (
              <div className="text-start mb-5 fw-bold">
                <Link
                  to="/admin-main-panel"
                  className="stretch-link text-secondary"
                >
                  <GrUserAdmin color="white" size="30px" />
                </Link>
              </div>
            )}
          </div>
        )}
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
