import { Outlet, useLoaderData } from "react-router-dom";
import ProductsTable from "../../components/UI/products/ProductsTable";
import { Product } from "../../validations/productValidation";

export function ListProductView() {
  //----> Get all products via router-context.
  const products = useLoaderData() as Product[];

  console.log({products})

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
         <ProductsTable 
          baseUrl="list-products"
          products={products} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
