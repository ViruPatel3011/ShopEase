import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from '../../../Redux/Slice/Auth/authSlice';
import { selectUserInfo } from '../../../Redux/Slice/User/userSlice';

export default function ProtectedAdmin({ children }) {

    const user = useSelector(selectLoggedInUserToken);
    const userInfo = useSelector(selectUserInfo);

    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>;
    }
    if (user && userInfo?.role !== 'admin') {
        return <Navigate to="/" replace={true}></Navigate>;
    }
    return children;
}
