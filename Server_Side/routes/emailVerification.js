const express = require("express");
const router = express.Router();

const {
    verifyUserEmail
} = require("./../controllers/emailVerification.js");


router.post("/email-verification", verifyUserEmail);

module.exports = router;
