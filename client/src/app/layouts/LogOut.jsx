import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../components/ui/Loader";
import { logOut } from "../store/users";

const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
        // eslint-disable-next-line
    }, []);
    return <Loader />;
};

export default LogOut;
