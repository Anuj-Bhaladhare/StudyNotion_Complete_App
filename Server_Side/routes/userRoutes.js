const express = require("express");
const router = express.Router();


const { 
    signup,
    login, 
    resetPassword, 
    forgotPassword, 
    changePassword 
} = require("./../controllers/Auth.js");



router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);


module.exports = router;
