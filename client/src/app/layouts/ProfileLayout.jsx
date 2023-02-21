import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getIsLoggedIn } from "../store/users";

const ProfileLayout = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return !isLoggedIn ? <Navigate to="/login" /> : <Outlet />;
};

export default ProfileLayout;
