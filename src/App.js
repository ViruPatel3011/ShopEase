import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/CheckOut';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { checkAuthAsync, selectLoggedInUserToken, selectUserChecked } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import LogOut from './features/auth/components/LogOut';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminHome from './pages/AdminHome';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import StripeCheckOut from './pages/StripeCheckOut';

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
