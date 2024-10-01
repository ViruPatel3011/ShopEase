import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../Slice/Product/ProductSlice";
import authReducer from "../Slice/Auth/authSlice";
import cartReducer from "../Slice/Cart/cartSlice";
import orderReducer from "../Slice/Order/orderSlice";
import userReducer from "../Slice/User/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
