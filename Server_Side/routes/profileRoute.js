const express = require("express");
const router = express.Router();

const {
    getProfileDetailByID,
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    getEnrolledCourses,
    updateDisplayPicture,
    instructorDashboard
} = require("./../controllers/Profile.js");

// Delete User Account
router.get("/get-profile/:user_id", getProfileDetailByID);
router.delete("/deleteProfile", deleteAccount);
router.put("/update-profile/:id", updateProfile);
router.get("/getUserDetails", getAllUserDetails);

// Get Enroled Course
router.get("/getEnrolledCourses", getEnrolledCourses);
router.put("/updateDisplayPicture", updateDisplayPicture);
router.get("/instructorDashboard", instructorDashboard);

module.exports = router;
