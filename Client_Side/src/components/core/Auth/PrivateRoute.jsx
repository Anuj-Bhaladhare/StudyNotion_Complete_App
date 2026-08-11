import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "./../../../redux/hooks/index.ts";

const PrivateRoute = ({children}) => {

    const { token } = useAppSelector(state => state.auth);

    if ( token !== null ) {
        return <Outlet />;
    }

    return <Navigate to="/login" replace />

}

export default PrivateRoute;
