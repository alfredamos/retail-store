import { Product } from "../../../validations/productValidation";

interface DisplayOneProductNewProps {
  product: Product;
  onDeleteClick: () => void;
  onBackToList: () => void;
}

function DisplayOneProductNew({
  product,
  onBackToList,
  onDeleteClick,
}: DisplayOneProductNewProps) {
  const firstName = product.name?.split(" ")[0];
  return (
    <div className="card mt-5">
      <div className="col-md-10 offset-md-1">
        <h4 className="text-center text-success">{firstName}'s Details</h4>
        <hr />
        <article className="d-flex justify-content-between">
          <span>{firstName}</span>
          <span>
            Photo <img src="" alt="" />
          </span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Name</span>
          <span>{product.name}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Brand</span>
          <span>{product.brand}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Price</span>
          <span>{product.price}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>{product.quantity > 1? 'Quantities' : 'Quantity'}</span>
          <span>{product.quantity}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Description</span>
          <span>{product.description}</span>
        </article>
        <hr />
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary w-50 fw-bold"
            style={{ borderRadius: "20px" }}
            onClick={onBackToList}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-outline-danger w-50 fw-bold"
            style={{ borderRadius: "20px" }}
            onClick={onDeleteClick}
          >
            Delete
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default DisplayOneProductNew;
