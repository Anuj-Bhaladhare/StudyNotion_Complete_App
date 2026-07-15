const User = require("./../models/User.js");
const OTP = require("./../models/OTP.js");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Send OTP
const SendOTP = async (req, res) => {

    try {

        // fetch email from request ke body
        const { email } = req.body;

        // check if user already exist
        const checkUserPresent = await findUserDatabase(email);

        // If user already exist, then return a responce
        if (checkUserPresent) {
            return res.status(401).json({
                "success": false,
                "message": "User Already Registered"
            });
        }

        // generate otp
        let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false, 
                lowerCaseAlphabets: false, 
                specialChars: false 
        });
        console.log("OTP Generated: ", otp );

        // check unique otp or not
        const result = await findOTP_Database();

        while (result) {
            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false, 
                lowerCaseAlphabets: false, 
                specialChars: false 
            });
            result = await findOTP_Database();
        }

        const otpPayload = { email, otp }

        // create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        return res.status(200).json({
            "success": true,
            "message": "OTP Send Successfully",
            "otp": otp
        });

    } catch (error) {
        console.log("Error Occured in Sending OTP to Email", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Sending OTP to Email",
            "error": error
        });
    }

}

// signUp
const signUp = async (req, res) => {

    try {
        // data fetch from request ke body
        const {
            firstName,
            lastName,
            email,
            password, 
            confirmPassword,
            accountType,
            contactNnmber,
            otp
        }

        // check data properlly import or not
        if ( !firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp ) {
            return res.status(422).json({
                "success": false,
                "title": "Missing Required Fields",
                "status": 422,
                "message": "The request body is missing mandatory information required to complete this action.",
            });
        }

        // check user is already exit in database
        const checkUserExist = await checkUserDatabase();
        if (checkUserExist) {
            return res.status(409).json({
                "success": false,
                "title": "User Already Exists",
                "status": 409,
                "detail": "The provided information is already registered in our system.",
                "errors": {
                    "email": `The email address '${email}' is already taken.`
                }
            });
        }

        // compair password and confirm password 
        if (password !== confirmPassword) {
            return res.status(400).json({
                "success": false,
                "title": "Validation Error",
                "status": 400,
                "detail": "One or more request parameters failed validation.",
                "errors": {
                    "confirmPassword": "The confirmation password does not match the password."
                }
            });
        }

        // hash pasword | encryrpt password
        const hashPassword = await bcrypt.hash(password, 10);
        if (!hashPassword) {
            return res.status(400).json({
                "success": false,
                "message": "Pasword Encryption Error"
            });
        }

        // find most recent OTP stored for the user
        const recentOtp = await findRecentOtpDatabase(email);
        console.log(recentOtp);

        // validate otp
        if ( recentOtp.length == 0 ) {
            // OTP not found
            return res.status(400).json({
                "success": false,
                "message": "OTP Found"
            });
        } else if ( otp !== recentOtp.otp ) {
            // Invalid OTP
            return res.status(400).json({
                "success": false,
                "message": "Invalid OTP"
            });
        }

        // save entry in database 
        const saveUser = await createUserDatabase({
            firstName, 
            lastName, 
            email, 
            hashPassword,
            image: `https://api.dicebear.com/10.x/initials/svg?seed=${firstName} ${lastName}`
        });

        // success message
        return res.status(200).json({
            "success": true,
            "message": "User register successfully",
            saveUser
        });


    } catch (error) {
        console.log("Error Occured in Sending OTP to Email", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Sending OTP to Email",
            "error": error
        });
    }

}

//login
const login = async (req, res) => {

    try {
        // data fetch from request ke body
        const { email, password } = req.body;

        // check data properlly import or not
        if ( !email || !password ) {
            return res.status(422).json({
                "success": false,
                "title": "Missing Required Fields",
                "status": 422,
                "message": "The request body is missing mandatory information required to complete this action.",
            });
        }

        // check user is exit or not in database
        const checkUserExist = await  checkUserDatabase(email);
        if ( !checkUserExist ) {
            return res.status(401).json({
                "success": false,
                "title": "User Not Exists in Our Knoledeg base",
                "status": 409,
                "detail": "The provided information is NOT registered in our system.",
                "errors": {
                    "email": `The email address '${email}' is Not Found.`
                }
            });
        }

        // validate the password 
        const passwordValidation = await bcrypt.compare(password, checkUserExist.password);
        if ( !passwordValidation ) {
            return res.status(401).json({
                "success": false,
                "title": "Incurrect Password",
                "status": 409,
                "detail": "Your password is not match | password is incurrect",
                "errors": {
                    "email": `You password is not match`
                }
            });
        }

        // send success responce
        const payload = {
            email: checkUserExist.email, 
            id: checkUserExist.id, 
            role: checkUserExist.role
        }

        const jwt_token = jwt.sign(
            payload, 
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        
        // create cookie and send the response
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
        }
        res.cookie("token", jwt_token, options).status(200).json({
            "success": true,
            "message": "User login successfully in the system",
            "data": checkUserExist
        })

    } catch (error) {

        console.log("Error Occured in Sending OTP to Email", error.mesage);
        
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Sending OTP to Email",
            "error": error
        });

    }

}

//change password
const changePassword = async (req, res) => {

    try {

    } catch (error) {

        console.log("Error Occured in Sending OTP to Email", error.mesage);
        
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Sending OTP to Email",
            "error": error
        });

    }

}


// Export Module
module.exports = {
    SendOTP,
    signUp,
    login,
    changePassword
}

