import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture.jsx";
import DeleteAccount from "./DeleteAccount.jsx";
import EditProfile from "./EditProfile.jsx";
import UpdatePassword from "./UpdatePassword.jsx";

const Settings = () => {
    return (
        <>
        
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Profile
            </h1>

            {/* Change Profile Picture */}
            <ChangeProfilePicture />

            {/* Profile */}
            <EditProfile />

            {/* Password */}
            <UpdatePassword />

            {/* Delete Account */}
            <DeleteAccount />

        </>
    );
}

export default Settings;
