import { createBrowserRouter } from "react-router-dom";
import Layout from "./utils/Layout";
import { ErrorPage } from "./utils/errorPage";
import LoginView from "./views/auth/LoginView";
import { loginFormAction } from "./routerActionsAndLoaders/auth/loginFormAction";
import { profileUpdateFormAction } from "./routerActionsAndLoaders/auth/profileUpdateFormAction";
import { passwordChangeFormAction } from "./routerActionsAndLoaders/auth/passwordChangeFormAction";
import { signupFormAction } from "./routerActionsAndLoaders/auth/signupFormAction";
import PasswordChangeView from "./views/auth/passwordChangeView";
import ProfileUpdateView from "./views/auth/profileUpdateView";
import SignupView from "./views/auth/signupView";
import { LogoutView } from "./views/auth/LogoutView";
import { MustLoginView } from "./views/auth/MustLoginView";
import { NotAllowedView } from "./views/auth/NotAllowedView";
import { SomethingWrongView } from "./views/auth/SomethingWrongView";
import { HomeView } from "./views/auth/HomeView";
import ProtectedRoute from "./utils/ProtectedRoute";
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
import { getAllCustomerLoader } from "./routerActionsAndLoaders/customers/getAllCustomerLoader";
import CreateCustomerView from "./views/customers/CreateCustomerView";
import { addCustomerFormAction } from "./routerActionsAndLoaders/customers/addCustomerFormAction";
import DeleteCustomerView from "./views/customers/DeleteCustomerView";
import { getOneCustomerLoader } from "./routerActionsAndLoaders/customers/getOneCustomerLoader";
import DetailCustomerView from "./views/customers/DetailCustomerView";
import EditCustomerView from "./views/customers/EditCustomerView";
import { deleteCustomerFormAction } from "./routerActionsAndLoaders/customers/deleteCustomerFormAction";
import { editCustomerFormAction } from "./routerActionsAndLoaders/customers/editCustomerFormAction";
import { getAllOrderLoader } from "./routerActionsAndLoaders/orders/getAllOrderLoader";
import { getOneOrderLoader } from "./routerActionsAndLoaders/orders/getOneOrderLoader";
import DeleteOrderView from "./views/orders/DeleteOrderView";
import EditOrderView from "./views/orders/EditOrderView";
import BadRequestError from "./utils/badRequest";
import ComponentError from "./utils/ComponentError";
import { QueryClient } from "@tanstack/react-query";
import ProductListView from "./views/products/ProductListView";
import CartView from "./views/orders/CartView";
import CheckoutView from "./views/orders/CheckoutManyItemsView";
import { getCartOrderLoader } from "./routerActionsAndLoaders/orders/getCartOrderLoader";
import SingleOrderView from "./views/orders/SingleItemOrderView";
import DetailOrderView from "./views/orders/DetailOrderView";
import storeRedux from "./store";
import ProfileView from "./views/auth/admin/ProfileView";
import AdminUsersView from "./views/auth/admin/AdminUsersView";
import ListUserAdminView from "./views/users/ListUserAdminView";
import ListCustomerAdminView from "./views/customers/ListCustomerAdminView";
import { ListProductAdminView } from "./views/products/ListProductAdminView";
import { addCustomerLoader } from "./routerActionsAndLoaders/auth/addCustomerLoader";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AllState } from "./states/allState";
import MakeAdminView from "./views/auth/admin/MakeAdminView";
import { makeAdminFormAction } from "./routerActionsAndLoaders/auth/makeAdminFormAction";
import OrderDetailView from "./views/orders/OrderDetailView";
import ListOrderView from "./views/orders/ListOrderView";
import CustomerAllOrdersView from "./views/orders/CustomerAllOrdersView";
import { getAllCustomerOrderLoader } from "./routerActionsAndLoaders/orders/getAllCustomerOrderByUserIdLoader";

export type StoreAndQClient = {
  store: EnhancedStore<AllState>;
  queryClient: QueryClient;
};

const queryClient = new QueryClient();
const store = storeRedux;

//const storeR = store as EnhancedStore<AllState>

// eslint-disable-next-line no-shadow-restricted-names
const storeAndQClient = { queryClient, store } as unknown as StoreAndQClient;

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
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
        action: passwordChangeFormAction,
        errorElement: <ComponentError />,
      },
      {
        path: "edit-profile",
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
        loader: addCustomerLoader(store),
        action: addCustomerFormAction(storeAndQClient),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-main-panel",

        element: (
          <AdminRoute>
            <AdminUsersView />
          </AdminRoute>
        ),
      },
      {
        path: "/profiles/:userId",
        element: (
          <ProtectedRoute>
            <ProfileView />
          </ProtectedRoute>
        ),
        loader: getAllCustomerOrderLoader(store),
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
        path: "admin-customers",
        element: (
          <AdminRoute>
            <ListCustomerAdminView />
          </AdminRoute>
        ),
        loader: getAllCustomerLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-customers/signup",
        element: <SignupView />,
        action: signupFormAction(store),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-customers/new",
        element: (
          <ProtectedRoute>
            <CreateCustomerView />
          </ProtectedRoute>
        ),
        loader: addCustomerLoader(store),
        action: addCustomerFormAction(storeAndQClient),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-customers/delete/:id",
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
        path: "admin-customers/detail/:id",
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
        path: "admin-customers/edit/:id",
        element: (
          <ProtectedRoute>
            <EditCustomerView />
          </ProtectedRoute>
        ),
        loader: getOneCustomerLoader(queryClient),
        action: editCustomerFormAction(storeAndQClient),
        errorElement: <ComponentError />,
      },
      
      {
        path: "admin-orders",
        element: (
          <AdminRoute>
            <ListOrderView />
          </AdminRoute>
        ),
        loader: getAllOrderLoader,
        errorElement: <ComponentError />,
      },
      {
        path: "admin-orders/view/:id",
        element: (
          <ProtectedRoute>
            <DetailOrderView />
          </ProtectedRoute>
        ),
        loader: getOneOrderLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-orders/detail/:id",
        element: (
          <AdminRoute>
            <OrderDetailView />
          </AdminRoute>
        ),
        loader: getOneOrderLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-orders/delete/:id",
        element: (
          <ProtectedRoute>
            <DeleteOrderView />
          </ProtectedRoute>
        ),
        loader: getOneOrderLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-orders/edit/:id",
        element: (
          <ProtectedRoute>
            <EditOrderView />
          </ProtectedRoute>
        ),
        loader: getOneOrderLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "/orders",
        element: <ProtectedRoute>
          <CustomerAllOrdersView/>
        </ProtectedRoute>,
        loader: getAllCustomerOrderLoader(store),
        errorElement: <ComponentError/>
      },
      {
        path: "admin-users",
        element: (
          <AdminRoute>
            <ListUserAdminView />
          </AdminRoute>
        ),
        loader: getAllUserLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-users/signup",
        element: (
          <AdminRoute>
            <SignupView />
          </AdminRoute>
        ),
        action: signupFormAction(store),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-users/delete/:id",
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
        path: "admin-users/detail/:id",
        element: (
          <ProtectedRoute>
            <DetailUserView />
          </ProtectedRoute>
        ),
        loader: getOneUserLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-users/edit/:id",
        element: (
          <ProtectedRoute>
            <ProfileUpdateView />
          </ProtectedRoute>
        ),
        loader: getOneUserLoader(queryClient),
        action: profileUpdateFormAction(store),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-users/make-admin/:id",
        element: (
          <AdminRoute>
            <MakeAdminView />
          </AdminRoute>
        ),
        loader: getOneUserLoader(queryClient),
        action: makeAdminFormAction,
        errorElement: <ComponentError />,
      },
      
      {
        path: "admin-products",
        element: (
          <AdminRoute>
            <ListProductAdminView />
          </AdminRoute>
        ),
        loader: getAllProductsLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-products/view/:id",
        element: (
          <ProtectedRoute>
            <DetailProductView />
          </ProtectedRoute>
        ),
        loader: getOneProductLoader(queryClient),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-products/new",
        element: (
          <AdminRoute>
            <CreateProductView />
          </AdminRoute>
        ),
        action: addProductFormAction(store),
        errorElement: <ComponentError />,
      },
      {
        path: "admin-products/delete/:id",
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
        path: "admin-products/edit/:id",
        loader: getOneProductLoader(queryClient),
        element: (
          <AdminRoute>
            <EditProductView />
          </AdminRoute>
        ),
        action: editProductFormAction(store),
        errorElement: <ComponentError />,
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
