const express = require("express");
const router = express.Router();


const { 
    signup,
    login, 
    resetPassword, 
    forgotPassword, 
    changePassword,
    resendOTP
} = require("./../controllers/Auth.js");

const {
    getUserByIdController,
    updateUserByIdController
} = require("./../controllers/users.js");


router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.put("/change-password/:id", changePassword);


router.get("/user/get-user/:id", getUserByIdController);
router.put("/user/update-user/:id", updateUserByIdController);

module.exports = router;
