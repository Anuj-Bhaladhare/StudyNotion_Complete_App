const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./../modele/User.js");

// auth
const auth = async (req, res, next) => {
    try {  
        // Extract token
        const token = req.cookies.token || req.body.token || req.header("Auth");

        // if token missing, then return response
        if ( !token ) {
            return res.status(404).json({
                "success": false,
                "message": "Token is Missing"
            })
        }

        // verify the token
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            "success": false,
            "message": "Something went wrong while validating the token",
            "error": error
        });
    }
}

// isStudent
const isStudent = async (req, res, next) => {
    try {

        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                "success": false,
                "message": "This is a protected route for Student only"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            "success": false,
            "message": "Something went wrong while validating the token",
            "error": error
        });
    }
}

// isInstructor
const isInstructor = async (req, res, next) => {
    try {
        
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                "success": false,
                "message": "This is a protected route for Instructor only"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            "success": false,
            "message": "Something went wrong while validating the token",
            "error": error
        });
    }
}

// isAdmin
const isAdmin = async (req, res, next) => {
    try {
        
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                "success": false,
                "message": "This is a protected route for Admin only"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            "success": false,
            "message": "Something went wrong while validating the token",
            "error": error
        });
    }
}

module.exports = {
    auth,
    isStudent,
    isInstructor,
    isAdmin
}
