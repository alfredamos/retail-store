import { Link } from "react-router-dom";

export function AdminPanel() {
  return (
    <div className="row">
      <div className="col col-sm-6 offset-3">
        <div className="card shadow-lg p-5 border-2 border-primary">
          <div className="card-body p-lg-5">
            <h1 className="text-primary">Admin Panel</h1>
            <table className="table table-striped table-bordered table-responsive">
              <thead>
                <tr>
                  {/* <th className="fw-bolder">Cart Items</th> */}
                  <th className="fw-bolder">Customers</th>
                  <th className="fw-bolder">Orders</th>
                  <th className="fw-bolder">Products</th>
                  <th className="fw-bolder">Users</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  
                  <td>
                    <Link className="link-primary fw-bold" to="/customers">
                      List Customers &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-primary fw-bold" to="/list-orders">
                      List Orders &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-primary fw-bold" to="/list-products">
                      List Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-primary fw-bold" to="/users">
                      List User &#10148;
                    </Link>
                  </td>
                </tr>
                <tr>
                  
                  <td>
                    <Link className="link-secondary fw-bold" to="/customers/new">
                      Create Customers &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-secondary fw-bold" to="/list-orders/new">
                      Create Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-secondary fw-bold" to="/list-products/new">
                      Create Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-secondary fw-bold" to="#">
                      Create User &#10148;
                    </Link>
                  </td>
                </tr>
                <tr>
                  
                  <td>
                    <Link className="link-success fw-bold" to="/customers">
                      View Customers &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-success fw-bold" to="/list-orders">
                      View Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-success fw-bold" to="/list-products">
                      View Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-success fw-bold" to="/users">
                      View User &#10146;
                    </Link>
                  </td>
                </tr>
                <tr>
                  
                  <td>
                    <Link className="link-warning fw-bold" to="/customers">
                      Update Customer &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-warning fw-bold" to="/list-orders">
                      Update Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-warning fw-bold" to="/list-products">
                      Update Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-warning fw-bold" to="/users">
                      Update User &#10146;
                    </Link>
                  </td>
                </tr>
                <tr>
                  
                  <td>
                    <Link className="link-danger fw-bold" to="/customers">
                      Delete Customers &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-danger fw-bold" to="/list-orders">
                      Delete Order &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-danger fw-bold" to="/list-products">
                      Delete Product &#10148;
                    </Link>
                  </td>
                  <td>
                    <Link className="link-danger fw-bold" to="/users">
                      Delete User &#10146;
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-transparent text-dark d-flex justify-content-center align-content-center border-top-0">
            <Link
              className="btn btn-outline-secondary btn-lg w-90 fw-bold rounded-5"
              to="/users"
            >
              Change User Role
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
