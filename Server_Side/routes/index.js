const express = require("express");
const router = express.Router();

// Import all Routers Here
const userRouter = require("./userRoutes.js");
const emailVerification = require("./emailVerification.js");
const courseRoutes = require("./courseRoutes.js");

// Define Router Path
router.use("/auth", userRouter);
router.use("/email", emailVerification);
router.use("/course", courseRoutes);


// Exports Router Module
module.exports = router;
