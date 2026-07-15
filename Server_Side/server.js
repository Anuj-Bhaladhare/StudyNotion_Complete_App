const express = require("express");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const { cloudinaryConnect } = require("./config/cloudinary.js");
const router = require("./routes/index.js");

// Define variable and Functions
const app = express();
require("dotenv").config();

// Define Port here
const PORT = process.env.PORT || 5000;

// Implement JSON parse support
app.use(express.json());

// Implement Cookie parse support
app.use(cookieParser());

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

// implemetn router functionality
app.use("/api/v1", router);

// Create the test get request
app.get("/", (req, res) => {

    res.send(`StudyNotion Server Started at PORT number ${PORT}`);
    return res.status(200).json({
        "success": true,
        "message": `StudyNotion Server Started at PORT number ${PORT}`,
    });

});

// Start the Server
app.listen(PORT, () => {
    console.log(`StudyNotion Server Started at PORT number ${PORT}`);
});
