const express = require("express");
const router = express.Router();

// Import all Routers Here
const userRouter = require("./userRoutes.js");

// Define Router Path
router.use("/auth", userRouter);

// Exports Router Module
module.exports = router;
