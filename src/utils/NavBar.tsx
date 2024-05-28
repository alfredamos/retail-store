import { NavLink} from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";
import { useOrder } from "../hooks/orders/useOrder";
import { FaShoppingCart } from "react-icons/fa";

export function NavBar() {
  const { currentUser, isLoggedIn, isAdmin } = useAuth();
  const { quantities } = useOrder();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5 d-flex">
        <div className="container d-flex justify-content-between align-content-center p-4">
          {!isLoggedIn && (
            <span className="fst-italic fs-6 fw-bold">Retail-Shop</span>
          )}
          {isLoggedIn && (
            <>
              <NavLink
                type="button"
                className="navbar-brand mx-xxl-5"
                to="/products"
              >
                <span className="fst-italic fs-6 fw-bold d-flex align-content-center justify-content-center">
                  Retail-Shop
                </span>
              </NavLink>
              <div className="d-flex justify-content-between align-content-center">
                Welcome {currentUser.name}
              </div>
            </>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li classNameName="nav-item" v-if="isAdmin">
            <NavLink type="button" classNameName="nav-navLNavLink mx-xxl-5" to="/users"
              >Users</NavLink
            >
          </li> */}
            </ul>
            <ul className="d-flex navbar-nav">
              {isLoggedIn && (
                <li className="nav-item dropdown mx-5">
                  <NavLink
                    type="button"
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Settings
                  </NavLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        type="button"
                        className="dropdown-item"
                        to="/change-password"
                      >
                        Change Password
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        type="button"
                        className="dropdown-item"
                        to="/edit-profile"
                      >
                        Edit Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        type="button"
                        className="dropdown-item"
                        to={`/profiles/${currentUser?.id}`}
                      >
                        Profile
                      </NavLink>
                    </li>
                    {isAdmin && (
                      <>
                        <li>
                          <NavLink
                            type="button"
                            className="dropdown-item"
                            to="/admin-main-panel"                          >
                            Admin Main Panel
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              )}

              {!isLoggedIn && (
                <>
                  <li className="nav-item mx-5">
                    <NavLink type="button" className="nav-link" to="/login">
                      login
                    </NavLink>
                  </li>
                  <li className="nav-item mx-5">
                    <NavLink type="button" className="nav-link" to="/signup">
                      signup
                    </NavLink>
                  </li>
                </>
              )}

              {isAdmin && (
                <li className="nav-item mx-5">
                  <NavLink type="button" className="nav-link" to="/admin-panel">
                    Admin
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item mx-5 d-flex justify-content-center align-content-center">
                  <NavLink
                    type="button"
                    className="nav-link align-self-auto mx-5"
                    to="/logout"
                  >
                    logout
                  </NavLink>
                  {quantities ? (
                    <NavLink
                      type="button"
                      className="nav-link align-self-auto mx-5"
                      to="/cart"
                    >
                      <div className="position-relative">
                        <FaShoppingCart
                          size="1.8rem"
                          color="gray"
                          style={{ alignSelf: "center" }}
                        />
                        <span
                          className="position-absolute top-0 bg-secondary p-1 start-100 translate-middle text-white border border-light fs-6 fw-bold px-2"
                          style={{
                            display: "inline-block",
                            borderRadius: "100%",
                          }}
                        >
                          {quantities ? quantities : ""}
                        </span>
                      </div>
                    </NavLink>
                  ) : (
                    ""
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
