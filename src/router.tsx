import { createBrowserRouter } from "react-router-dom";
import Layout from "./utils/Layout";
import { ErrorPage } from "./utils/errorPage";
import LoginView from "./views/auth/LoginView";
import { loginFormAction } from "./routerActionsAndLoaders/auth/loginFormAction";
import { profileUpdateFormAction } from "./routerActionsAndLoaders/auth/profileUpdateFormAction";
import { passwordChangeFormAction } from "./routerActionsAndLoaders/auth/passwordChangeFormAction";
import { signupFormAction } from "./routerActionsAndLoaders/auth/signupFormAction";
import { currentUserLoader } from "./routerActionsAndLoaders/auth/currentUserLoader";
import PasswordChangeView from "./views/auth/passwordChangeView";
import ProfileUpdateView from "./views/auth/profileUpdateView";
import SignupView from "./views/auth/signupView";
import { LogoutView } from "./views/auth/LogoutView";
import { MustLoginView } from "./views/auth/MustLoginView";
import { NotAllowedView } from "./views/auth/NotAllowedView";
import { SomethingWrongView } from "./views/auth/SomethingWrongView";
import { HomeView } from "./views/auth/HomeView";
import ProtectedRoute from "./utils/ProtectedRoute";
import ListUserView from "./views/users/ListUserView";
import DeleteUserView from "./views/users/DeleteUserView";
import DetailUserView from "./views/users/DetailUserView";
import AdminRoute from "./utils/AdminRoute";
import { getAllUserLoader } from "./routerActionsAndLoaders/users/getAllUserLoader";
import { getOneUserLoader } from "./routerActionsAndLoaders/users/getOneUserLoader";
import { getAllProductsLoader } from "./routerActionsAndLoaders/products/getAllProductsLoader";
import { getOneProductLoader } from "./routerActionsAndLoaders/products/getOneProductLoader";
import { addProductFormAction } from "./routerActionsAndLoaders/products/addProductFormAction";
import { deleteProductFormAction } from "./routerActionsAndLoaders/products/deleteProductFormAction";
import { editProductFormAction } from "./routerActionsAndLoaders/products/editProductFormAction";
import DetailProductView from "./views/products/DetailProductView";
import CreateProductView from "./views/products/CreateProductView";
import DeleteProductView from "./views/products/DeleteProductView";
import EditProductView from "./views/products/EditProductView";
import ListCustomerView from "./views/customers/ListCustomerView";
import { getAllCustomerLoader } from "./routerActionsAndLoaders/customers/getAllCustomerLoader";
import CreateCustomerView from "./views/customers/CreateCustomerView";
import { addCustomerFormAction } from "./routerActionsAndLoaders/customers/addCustomerFormAction";
import DeleteCustomerView from "./views/customers/DeleteCustomerView";
import { getOneCustomerLoader } from "./routerActionsAndLoaders/customers/getOneCustomerLoader";
import DetailCustomerView from "./views/customers/DetailCustomerView";
import EditCustomerView from "./views/customers/EditCustomerView";
import { deleteCustomerFormAction } from "./routerActionsAndLoaders/customers/deleteCustomerFormAction";
import { editCustomerFormAction } from "./routerActionsAndLoaders/customers/editCustomerFormAction";
import ListCartItemView from "./views/cartItems/ListCartItemView";
import { getAllCartItemLoader } from "./routerActionsAndLoaders/cartItems/getAllCartItemLoader";
import DetailCartItemView from "./views/cartItems/DetailCartItemView";
import { getOneCartItemLoader } from "./routerActionsAndLoaders/cartItems/getOneCartItemLoader";
import { addCartItemFormAction } from "./routerActionsAndLoaders/cartItems/addCartItemFormAction";
import DeleteCartItemView from "./views/cartItems/DeleteCartItemView";
import ListOrderView from "./views/orders/ListOrderView";
import { getAllOrderLoader } from "./routerActionsAndLoaders/orders/getAllOrderLoader";
import { getOneOrderLoader } from "./routerActionsAndLoaders/orders/getOneOrderLoader";
import DeleteOrderView from "./views/orders/DeleteOrderView";
import { deleteOrderFormAction } from "./routerActionsAndLoaders/orders/deleteOrderFormAction";
import EditOrderView from "./views/orders/EditOrderView";
import BadRequestError from "./utils/badRequest";
import ComponentError from "./utils/ComponentError";
import { AdminPanel } from "./views/auth/admin/AdminPanel";
import { QueryClient } from "@tanstack/react-query";
import ProductListView from "./views/products/ProductListView";
import CartView from "./views/orders/CartView";
import CheckoutView from "./views/orders/CheckoutManyItemsView";
import { getCartOrderLoader } from "./routerActionsAndLoaders/orders/getCartOrderLoader";
import { ListProductView } from "./views/products/ListProductView";
import SingleOrderView from "./views/orders/SingleItemOrderView";
import DetailOrderView from "./views/orders/DetailOrderView";
import OrderListView from "./views/orders/OrderListView";
import storeRedux from "./store";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AllState } from "./states/allState";


export type StoreAndQClient = {
  store: EnhancedStore<AllState>,
  queryClient: QueryClient
}

const queryClient = new QueryClient();
const store = storeRedux;

// eslint-disable-next-line no-shadow-restricted-names
const storeAndQClient = {queryClient, store} as StoreAndQClient

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      { path: "admin-panel", element: <AdminPanel /> },
      { path: "bad-request", element: <BadRequestError /> },
      { path: "logout", element: <LogoutView /> },
      { path: "home", element: <HomeView /> },
      { path: "must-login", element: <MustLoginView /> },
      { path: "not-allowed", element: <NotAllowedView /> },
      { path: "something-wrong", element: <SomethingWrongView /> },
      {
        path: "login",
        element: <LoginView />,
        action: loginFormAction,
        errorElement: <ComponentError />,
      },
      {
        path: "change-password",

        element: (
          <ProtectedRoute>
            <PasswordChangeView />
          </ProtectedRoute>
        ),
        loader: currentUserLoader,
        action: passwordChangeFormAction,
        errorElement: <ComponentError />,
      },
      {
        path: "edit-profile",
        loader: currentUserLoader,
        element: (
          <ProtectedRoute>
            <ProfileUpdateView />
          </ProtectedRoute>
        ),
        action: profileUpdateFormAction(store),
        errorElement: <ComponentError />,
      },
      {
        path: "signup",
        element: <SignupView />,
        action: signupFormAction(store),
        errorElement: <ComponentError />,
      },
      {
        path: "signup/new-customer",
        element: (
          <ProtectedRoute>
            <CreateCustomerView />
          </ProtectedRoute>
        ),
        loader: currentUserLoader,
        action: addCustomerFormAction(storeAndQClient),
        errorElement: <ComponentError />,
      },
      {
        path: "cart-items",
        loader: getAllCartItemLoader,
        element: (
          <AdminRoute>
            <ListCartItemView />
          </AdminRoute>
        ),
        errorElement: <ComponentError />,
        children: [
          {
            path: "view/:id",
            loader: getOneCartItemLoader,
            element: (
              <AdminRoute>
                <DetailCartItemView />
              </AdminRoute>
            ),
            action: addCartItemFormAction,
            errorElement: <ComponentError />,
          },
          {
            path: "delete/:id",
            element: (
              <AdminRoute>
                <DeleteCartItemView />
              </AdminRoute>
            ),
            errorElement: <ComponentError />,
          },
        ],
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <CartView />
          </ProtectedRoute>
        ),
        loader: getCartOrderLoader(store),
        errorElement: <ComponentError />,
      },
      {
        path: "/list-orders",
        element: (
          <AdminRoute>
            <OrderListView />
          </AdminRoute>
        ),
        loader: getAllOrderLoader(storeAndQClient),
        errorElement: <ComponentError />,
        children: [
          {
            path: "view/:id",
            element: (
              <ProtectedRoute>
                <DetailOrderView />
              </ProtectedRoute>
            ),
            loader: getOneOrderLoader(queryClient),
            errorElement: <ComponentError />,
          },
          {
            path: "delete/:id",
            element: (
              <ProtectedRoute>
                <DeleteOrderView />
              </ProtectedRoute>
            ),
            loader: getOneOrderLoader(queryClient),
            errorElement: <ComponentError />,
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute>
                <EditOrderView />
              </ProtectedRoute>
            ),
            loader: getOneOrderLoader(queryClient),
            errorElement: <ComponentError />,
          },
        ],
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutView />
          </ProtectedRoute>
        ),
        loader: getCartOrderLoader(store),
        errorElement: <ComponentError />,
      },
      {
        path: "/product-details/:id",
        element: (
          <ProtectedRoute>
            <SingleOrderView />
          </ProtectedRoute>
        ),
        loader: getOneProductLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "customers",
        element: (
          <AdminRoute>
            <ListCustomerView />
          </AdminRoute>
        ),
        loader: getAllCustomerLoader(queryClient),
        errorElement: <ComponentError />,
        children: [
          {
            path: "signup",
            element: <SignupView />,
            action: signupFormAction(store),
            errorElement: <ComponentError />,
          },
          {
            path: "new",
            element: (
              <ProtectedRoute>
                <CreateCustomerView />
              </ProtectedRoute>
            ),
            loader: currentUserLoader,
            action: addCustomerFormAction(storeAndQClient),
            errorElement: <ComponentError />,
          },
          {
            path: "delete/:id",
            element: (
              <AdminRoute>
                <DeleteCustomerView />
              </AdminRoute>
            ),
            loader: getOneCustomerLoader(queryClient),
            action: deleteCustomerFormAction(storeAndQClient),
            errorElement: <ComponentError />,
          },
          {
            path: "detail/:id",
            element: (
              <ProtectedRoute>
                <DetailCustomerView />
              </ProtectedRoute>
            ),
            loader: getOneCustomerLoader(queryClient),
            action: deleteCustomerFormAction(storeAndQClient),
            errorElement: <ComponentError />,
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute>
                <EditCustomerView />
              </ProtectedRoute>
            ),
            loader: getOneCustomerLoader(queryClient),
            action: editCustomerFormAction(storeAndQClient),
            errorElement: <ComponentError />,
          },
        ],
      },
      {
        path: "orders",
        element: (
          <AdminRoute>
            <ListOrderView />
          </AdminRoute>
        ),
        loader: getAllOrderLoader(storeAndQClient),
        errorElement: <ComponentError />,
      },

      {
        path: "orders/detail/:id",
        element: (
          <ProtectedRoute>
            <DetailOrderView />
          </ProtectedRoute>
        ),
        loader: getOneOrderLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "orders/delete/:id",
        element: (
          <ProtectedRoute>
            <DeleteOrderView />
          </ProtectedRoute>
        ),
        loader: getOneOrderLoader(queryClient),
        action: deleteOrderFormAction(store),
        errorElement: <ComponentError />,
      },
      {
        path: "orders/edit/:id",
        element: (
          <ProtectedRoute>
            <EditOrderView />
          </ProtectedRoute>
        ),
        loader: getOneOrderLoader(queryClient),
        action: deleteOrderFormAction(store),
        errorElement: <ComponentError />,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <ListUserView />
          </AdminRoute>
        ),
        loader: getAllUserLoader(queryClient),
        errorElement: <ComponentError />,
        children: [
          {
            path: "signup",
            element: (
              <AdminRoute>
                <SignupView />
              </AdminRoute>
            ),
            action: signupFormAction(store),
            errorElement: <ComponentError />,
          },
          {
            path: "delete/:id",
            element: (
              <AdminRoute>
                <DeleteUserView />
              </AdminRoute>
            ),
            loader: getOneUserLoader(queryClient),
            //action: userDeleteFormAction(queryClient),
            errorElement: <ComponentError />,
          },
          {
            path: "detail/:id",
            element: (
              <ProtectedRoute>
                <DetailUserView />
              </ProtectedRoute>
            ),
            loader: getOneUserLoader(queryClient),
            // action: userDeleteFormAction(queryClient),
            errorElement: <ComponentError />,
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute>
                <ProfileUpdateView />
              </ProtectedRoute>
            ),
            loader: currentUserLoader,
            action: profileUpdateFormAction(store),
            errorElement: <ComponentError />,
          },
        ],
      },
      {
        path: "list-products",
        element: (
          <ProtectedRoute>
            <ListProductView />
          </ProtectedRoute>
        ),
        loader: getAllProductsLoader(queryClient),
        errorElement: <ComponentError />,
        children: [
          {
            path: "view/:id",
            element: (
              <ProtectedRoute>
                <DetailProductView />
              </ProtectedRoute>
            ),
            loader: getOneProductLoader(queryClient),
            errorElement: <ComponentError />,
          },
          {
            path: "new",
            element: (
              <AdminRoute>
                <CreateProductView />
              </AdminRoute>
            ),
            action: addProductFormAction(store),
            errorElement: <ComponentError />,
          },
          {
            path: "delete/:id",
            loader: getOneProductLoader(queryClient),
            element: (
              <AdminRoute>
                <DeleteProductView />
              </AdminRoute>
            ),
            action: deleteProductFormAction(store),
            errorElement: <ComponentError />,
          },
          {
            path: "edit/:id",
            loader: getOneProductLoader(queryClient),
            element: (
              <AdminRoute>
                <EditProductView />
              </AdminRoute>
            ),
            action: editProductFormAction(store),
            errorElement: <ComponentError />,
          },
        ],
      },
      {
        path: "products",
        loader: getAllProductsLoader(queryClient),
        element: (
          <ProtectedRoute>
            <ProductListView />
          </ProtectedRoute>
        ),
        errorElement: <ComponentError />,
      },
      {
        path: "",
        loader: getAllProductsLoader(queryClient),
        element: (
          <ProtectedRoute>
            <ProductListView />
          </ProtectedRoute>
        ),
        errorElement: <ComponentError />,
      },
    ],
  },
]);

export default router;
