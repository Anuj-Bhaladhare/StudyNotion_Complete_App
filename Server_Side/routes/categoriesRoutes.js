const express = require("express");
const router = express.Router();

const {
    showAllCategory
} = require("./../controllers/Categories.js");

router.get("/show-all-category", showAllCategory);

module.exports = router;
