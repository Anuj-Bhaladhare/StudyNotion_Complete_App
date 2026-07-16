const express = require("express");
const router = express.Router();

// Import all Routers Here
const userRouter = require("./userRoutes.js");
const emailVerification = require("./emailVerification.js");

// Define Router Path
router.use("/auth", userRouter);
router.use("/email", emailVerification);

// Exports Router Module
module.exports = router;
