import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "./../../../redux/hooks/index.ts";

const PrivateRoute = () => {

    const { token } = useAppSelector(state => state.auth);

    return (
        <>
            {
                token ? (
                    <Outlet />
                ) : (
                    <Navigate to="/login" replace />
                )
            }
        </>
    )

}

export default PrivateRoute;
