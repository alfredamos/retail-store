import { Form } from "react-router-dom";
import { Product } from "../../../validations/productValidation";
import Input from "../formUtils/Input";
import TextArea from "../formUtils/TextArea";
import Button from "../formUtils/Button";

interface ProductFormProps {
  formName: string;
  product: Product;
  backToListHandler: () => void;
}

function ProductForm({
  formName,
  backToListHandler,
  product,
}: ProductFormProps) {
  return (
    <div className="card mt-5">
      <Form method="post">
        <div className="card-header">
          <h4 className="text-center">{formName} Product Form</h4>
        </div>
        <div className="card-body">
          <Input
            id="name"
            labelName="Name"
            name="name"
            type="text"
            required
            defaultValue={product.name}
            className="form-control"
          />
          <Input
            id="brand"
            labelName="Brand"
            name="brand"
            type="text"
            required
            defaultValue={product.brand}
            className="form-control"
          />
          <Input
            id="image"
            labelName="image"
            name="image"
            type="text"
            required
            defaultValue={product.image}
            className="form-control"
          />
          <Input
            id="price"
            labelName="price"
            name="price"
            type="number"
            required
            defaultValue={product.price}
            className="form-control"
          />
          <Input
            id="quantity"
            labelName="quantity"
            name="quantity"
            type="number"
            required
            defaultValue={product.quantity}
            className="form-control"
          />
          <TextArea
            id="description"
            labelName="description"
            name="description"
            required
            defaultValue={product.description}
            className="form-control"
          />
        </div>
        <div className="card-footer d-flex justify-content-between">
          <Button
            type="button"
            className="btn btn-outline-secondary w-50 fw-bold"
            onClick={backToListHandler}
            style={{ borderRadius: "20px" }}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="btn btn-outline-primary w-50 fw-bold"
            style={{ borderRadius: "20px" }}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductForm;
