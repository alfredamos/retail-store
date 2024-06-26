import { Link } from "react-router-dom";

export const MustLoginView = () => {
  return (    
    <div className="row mt-5">
      <div className="col-6 col-sm-6 mx-auto">
        <div className="card shadow-lg p-5 border-2 border-primary">
          <div className="card-body p-lg-5">
            <p className="lead text-primary">
              You must login to view this page!
            </p>
          </div>
          <div className="d-flex align-content-center justify-content-between p-5">
            <Link className="link-primary" to="/login">
              Login
            </Link>
            <Link className="link-primary" to="/signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
