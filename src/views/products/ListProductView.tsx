import { Outlet, useLoaderData } from "react-router-dom";
import ProductsTable from "../../components/UI/products/ProductsTable";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "../../queries/products/productsQuery";
import { getAllProductsLoader } from "../../routerActionsAndLoaders/products/getAllProductsLoader";
import { Product } from "../../validations/productValidation";

export function ListProductView() {
  //----> Get all products via router-context.
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof getAllProductsLoader>>
  >;

  //----> Combine the useLoaderData with useQuery to enable cache.
  const { data: products, isSuccess } = useQuery({ ...productsQuery(), initialData });

  console.log({products})

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          {isSuccess && <ProductsTable products={products as Product[]} />}
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
