import React, { useState } from "react";
import { Toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink.jsx";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "./../../common/ConfirmationModal.jsx";
import { sidebarLinks } from "./../../../data/dashboard-links.js";
import { useAppDispatch, useAppSelector } from "./../../../redux/hooks/index.ts";

const Sidebar = () => {

    const { user, loading: profileLoading } = useAppSelector( (state) => state.profile )
    const [ confirmationModal, setConfirmationModal ] = useState(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = () => {
        console.log("Logout");
        localStorage.removeItem(token);
        localStorage.removeItem(user);
        

    }

    return (
        <>
            <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.account_type !== link.type) return null
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )}
                        )
                    }
                </div>
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
                    <div className="flex flex-col">
                    <SidebarLink
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />
                    <button
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => logout(),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">

                            <VscSignOut className="text-lg" />
                            <span>Logout</span>

                        </div>
                    </button>
                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </>
    )

} 

export default Sidebar;
