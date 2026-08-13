const express = require("express");
const router = express.Router();

// Import all Routers Here
const userRouter = require("./userRoutes.js");
const emailRouter = require("./emailRoute.js");
const courseRoutes = require("./courseRoutes.js");
const categoriesRoutes = require("./categoriesRoutes.js");
const contactRoute = require("./contactRoute.js");
const profileRoute = require("./profileRoute.js");


// Define Router Path
router.use("/auth", userRouter);
router.use("/email", emailRouter);
router.use("/course", courseRoutes);
router.use("/course/category", categoriesRoutes);
router.use("/contact", contactRoute);
router.use("/profile", profileRoute);

// Exports Router Module
module.exports = router;
