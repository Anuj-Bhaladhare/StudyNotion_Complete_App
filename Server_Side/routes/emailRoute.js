const express = require("express");
const router = express.Router();

const {
    verifyUserEmail,
    resendOTP
} = require("../controllers/Email.js");


router.post("/email-verification", verifyUserEmail);
router.post("/resend-verification-otp", resendOTP);

module.exports = router;

