import { Link } from "react-router-dom";

function AdminUsersView() {

  return (
    <div className="row">
      <div className="col-10 text-start mx-auto">
        <div className="card shadow-lg p-5 border-2 border-primary">
          <div className="card-body p-lg-5">
            <h1 className="text-primary">Admin Main Panel</h1>
            <table className="table table-striped table-bordered table-responsive">
              <thead>
                <tr>
                  <th className="fw-bolder">Customers</th>
                  <th className="fw-bolder">Orders</th>
                  <th className="fw-bolder">Products</th>
                  <th className="fw-bolder">Users</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link className="link-primary fw-bold" to="/admin-customers">
                      List Customers &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-primary fw-bold" to="/admin-orders">
                      List Orders &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-primary fw-bold" to="/admin-products">
                      List Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-primary fw-bold" to="/admin-users">
                      List User &#10148;
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link
                      className="link-secondary fw-bold"
                      to="/admin-customers/signup"
                    >
                      Create Customers &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="link-secondary fw-bold"
                      to="/products"
                    >
                      Create Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="link-secondary fw-bold"
                      to="/admin-products/new"
                    >
                      Create Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-secondary fw-bold" to="/admin-users/signup">
                      Create User &#10148;
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link className="link-success fw-bold" to="/admin-customers">
                      View Customers &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-success fw-bold" to="/admin-orders">
                      View Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-success fw-bold" to="/admin-products">
                      View Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-success fw-bold" to="/admin-users">
                      View User &#10146;
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link className="link-warning fw-bold" to="/admin-customers">
                      Update Customer &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-warning fw-bold" to="/admin-orders">
                      Update Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-warning fw-bold" to="/admin-products">
                      Update Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-warning fw-bold" to="/admin-users">
                      Update User &#10146;
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link className="link-danger fw-bold" to="/admin-customers">
                      Delete Customers &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-danger fw-bold" to="/admin-orders">
                      Delete Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-danger fw-bold" to="/admin-products">
                      Delete Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-danger fw-bold" to="/admin-users">
                      Delete User &#10146;
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AdminUsersView