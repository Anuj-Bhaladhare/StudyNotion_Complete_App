import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./../redux/hooks/index.ts";
import Sidebar from "./../components/core/dashboard/Sidebar.jsx";

const Dashboard = () => {

    const { loading: authLoading } = useAppSelector( (state) => state.auth );
    const { loading: profileLoading } = useAppSelector( (state) => state.profile );

    if ( authLoading || profileLoading ) {
        return (
            <div className="mt-10">
                Loading...
            </div>
        )
    }

    return (

        <div className="relative flex min-h-[calc(100vh-3.5rem)]">

            <Sidebar />

            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet />
                </div>
            </div>

        </div>

    )

}

export default Dashboard;
