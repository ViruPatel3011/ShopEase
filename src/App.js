import React, { useEffect } from 'react';
import Home from './Pages/ProductPage/Home';
import LoginPage from './Pages/AuthPage/LoginPage';
import SignUpPage from './Pages/AuthPage/SignUpPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from './Pages/CartPage/CartPage';
import Checkout from './Pages/CheckOutPage/CheckOut';
import ProductDetailPage from './Pages/ProductPage/ProductDetailPage';
import Protected from './Components/Auth/ProtectedRoute/Protected';
import ProtectedAdmin from './Components/Auth/ProtectedRoute/ProtectedAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './Redux/Slice/Cart/cartSlice';
import { checkAuthAsync, selectLoggedInUserToken, selectUserChecked } from './Redux/Slice/Auth/authSlice';
import PageNotFound from './Pages/NotFoundPage/404';
import OrderSuccessPage from './Pages/OrderSuccessPage/OrderSuccessPage';
import UserOrderPage from './Pages/UserPage/UserOrderPage';
import UserProfilePage from './Pages/UserPage/UserProfilePage';
import { fetchLoggedInUserAsync } from './Redux/Slice/User/userSlice';
import LogOut from './Components/Auth/LogOut';
import ForgotPasswordPage from './Pages/AuthPage/ForgotPasswordPage';
import AdminProductDetailPage from './Pages/AdminPage/AdminProductDetailPage';
import AdminHome from './Pages/AdminPage/AdminHome';
import AdminProductFormPage from './Pages/AdminPage/AdminProductFormPage';
import AdminOrdersPage from './Pages/AdminPage/AdminOrdersPage';
import StripeCheckOut from './Pages/PaymentPage/StripeCheckOut';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Protected>
        <Home></Home>
      </Protected>
    ,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "/cart",
    element:
      <Protected>
        <CartPage></CartPage>,
      </Protected>
  },
  {
    path: "/checkout",
    element:
      <Protected>
        <Checkout></Checkout>,
      </Protected>
  },
  {
    path: "/product-detail/:id",
    element:
      <Protected>
        <ProductDetailPage></ProductDetailPage>,
      </Protected>
  },
  {
    path: "/order-success/:id",
    element:
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>,
  },
  {
    path: "/orders",
    element:
      <Protected>
        <UserOrderPage></UserOrderPage>,
      </Protected>
  },
  {
    path: "/profile",
    element:
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
  },
  {
    path: "/admin",
    element:
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
  },
  {
    path: "/admin/product-detail/:id",
    element:
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
  },
  {
    path: "/admin/product-form",
    element:
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
  },
  {
    path: "/admin/product-form/edit/:id",
    element:
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
  },
  {
    path: "/admin/orders",
    element:
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
  },
  {
    path: "/stripe-checkout/",
    element:
      <Protected>
        <StripeCheckOut></StripeCheckOut>
      </Protected>
  },
  {
    path: "*",
    element:
      <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch])

  useEffect(() => {
    if (true) {
      dispatch(fetchItemsByUserIdAsync())
      // We can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync())
    }
  }, [dispatch, user])

  return (
    <>
      <div className="App">
        {userChecked &&
          <RouterProvider router={router} />
        }
      </div>
    </>
  );
}

export default App;
