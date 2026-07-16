
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { 
    findUserByEmail, 
    createUserEntry 
} = require("./../models/User.js");

const { sendVerificationEmail } = require("./sendEmails.js");


// Generate OTP
const generateOTP = () => {
    
    const otp = crypto.randomInt(100000, 1000000).toString();

    console.log("OTP", otp);

    return otp;

}

// User SignUp Controller
const signup = async (req, res) => {
    try {
      
        const { first_name, last_name, email, phone_number, password, confirm_password, account_type } = req.body;

        if ( !first_name, !last_name, !email, !password, !confirm_password, !account_type ) {
            return res.status(422).json({
                "success": false,
                "title": "Missing Required Fields",
                "status": 422,
                "message": "The request body is missing mandatory information required to complete this action.",
            });
        }

        const user_result = await findUserByEmail(email);

        if (user_result) {
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

        if ( password !== confirm_password ) {
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

        const password_hash = await bcrypt.hash(password, 10);
        if ( !password_hash ) {
            return res.status(400).json({
                "success": false,
                "message": "Pasword Encryption Error"
            });
        }

        // Generate OTP
        const email_otp = generateOTP();

        // Send Verification Email
        if (email_otp) {
            const otp_send_mail = await sendVerificationEmail( 
                email,  
                email_otp,  
                "EMAIL_VERIFICATION"
            );
            console.log("OTP Send Successfully", otp_send_mail);

            if ( otp_send_mail === true ) {

                const create_user = await createUserEntry(first_name, last_name, email, password_hash, account_type, phone_number);
     
                // Success response
                if (create_user) {
                    return res.status(201).json({
                        "success": true,
                        "message": "Registration completed successfully.",
                        "data": create_user
                    });
                }
            }
        }

    } catch (error) {
        console.log("Error Occured in SignUp Controller", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in SignUp Controller",
            "error": error
        });
    }
}


// User Login Controller
const login = async (req, res) => {
    try {
        // Take email and password from request body
        const { email, password } = req.body;

        // Validate required fields
        if ( !email || !password ) {
            return res.status(422).json({
                "success": false,
                "title": "Missing Required Fields",
                "status": 422,
                "message": "The request body is missing mandatory information required to complete this action.",
            });
        }

        // Find user by email in the database
        const user_result = await findUserByEmail(email);

        // If user does not exist, return "User not found"
        if ( !user_result ) {
            return res.status(404).json({
                "success": false,
                "title": "User Not Exists is System",
                "status": 404,
                "detail": "The provided information is not registered in our system.",
                "errors": {
                    "email": `The email address '${email}' is not found.`
                }
            });
        }

        // Check whether the user's email is verified || If email is not verified, return "Please verify your email first"
        if ( user_result.is_verified === false ) {
            return res.status(401).json({
                "success": false,
                "title": "User Not Verified",
                "status": 401,
                "message": "Please verify your email before logging in.",
            });
        }

        // Compare the entered password with the hashed password stored in the database
        const match_password = await bcrypt.compare(password, user_result.password_hash);

        // If password does not match, return "Invalid email or password"
        if ( !match_password ) {
            return res.status(401).json({
                "success": false,
                "title": "Invalid email or password",
                "status": 401,
                "message": "Password is In-Correct",
            });
        }

        // Create JWT payload with required user information
        const jwt_payload = {
            "id": user_result.id,
            "first_name": user_result.first_name,
            "last_name": user_result.last_name,
            "email": user_result.email,
            "account_type": user_result.account_type,
            "profile_id": user_result.profile_id,
            "is_active": user_result.is_active
        }

        // Generate JWT access token
        const token = jwt.sign(
            jwt_payload,
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // Store the token in an HTTP-only cookie
        res.cookie(
            "token", 
            token, 
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            }
        );

        // Send successful login response with user data and token (if required)
        return res.status(200).json({
            "success": true,
            "message": "User logged in successfully.",
            "data": jwt_payload
        });

    } catch (error) {
        console.log("Error Occured in Login Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Login Controller",
            "error": error
        });
    }
}


// Reset Password Controller
const resetPassword = async (req, res) => {
    try {
        console.log("resetPassword");
    } catch (error) {
        console.log("Error Occured in Reset Password Controller", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Reset Password Controller",
            "error": error
        });
    }
}


// Forgot Password Controller
const forgotPassword = async (req, res) => {
    try {
        console.log("forgotPassword");
    } catch (error) {
        console.log("Error Occured in Forgot Password Controller", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Forgot Password Controller",
            "error": error
        });
    }
}


// Change Password Controller
const changePassword = async (req, res) => {
    try {
        console.log("changePassword");
    } catch (error) {
        console.log("Error Occured in Change Password Controller", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Change Password Controller",
            "error": error
        });
    }
}


// Export Module
module.exports = {
    signup, 
    login, 
    resetPassword, 
    forgotPassword, 
    changePassword 
}


















// // Send OTP
// const SendOTP = async (req, res) => {

//     try {

//         // fetch email from request ke body
//         const { email } = req.body;

//         // check if user already exist
//         const checkUserPresent = await findUserDatabase(email);

//         // If user already exist, then return a responce
//         if (checkUserPresent) {
//             return res.status(401).json({
//                 "success": false,
//                 "message": "User Already Registered"
//             });
//         }

//         // generate otp
//         let otp = otpGenerator.generate(6, {
//                 upperCaseAlphabets: false, 
//                 lowerCaseAlphabets: false, 
//                 specialChars: false 
//         });
//         console.log("OTP Generated: ", otp );

//         // check unique otp or not
//         const result = await findOTP_Database();

//         while (result) {
//             let otp = otpGenerator.generate(6, {
//                 upperCaseAlphabets: false, 
//                 lowerCaseAlphabets: false, 
//                 specialChars: false 
//             });
//             result = await findOTP_Database();
//         }

//         const otpPayload = { email, otp }

//         // create an entry for OTP
//         const otpBody = await OTP.create(otpPayload);
//         console.log(otpBody);

//         return res.status(200).json({
//             "success": true,
//             "message": "OTP Send Successfully",
//             "otp": otp
//         });

//     } catch (error) {
//         console.log("Error Occured in Sending OTP to Email", error.mesage);
//         return res.status(500).json({
//             "success": false,
//             "message": "Error Occured in Sending OTP to Email",
//             "error": error
//         });
//     }

// }

// // signUp
// const signUp = async (req, res) => {

//     try {
//         // data fetch from request ke body
//         const {
//             firstName,
//             lastName,
//             email,
//             password, 
//             confirmPassword,
//             accountType,
//             contactNnmber,
//             otp
//         }

//         // check data properlly import or not
//         if ( !firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp ) {
//             return res.status(422).json({
//                 "success": false,
//                 "title": "Missing Required Fields",
//                 "status": 422,
//                 "message": "The request body is missing mandatory information required to complete this action.",
//             });
//         }

//         // check user is already exit in database
//         const checkUserExist = await checkUserDatabase();
//         if (checkUserExist) {
//             return res.status(409).json({
//                 "success": false,
//                 "title": "User Already Exists",
//                 "status": 409,
//                 "detail": "The provided information is already registered in our system.",
//                 "errors": {
//                     "email": `The email address '${email}' is already taken.`
//                 }
//             });
//         }

//         // compair password and confirm password 
//         if (password !== confirmPassword) {
//             return res.status(400).json({
//                 "success": false,
//                 "title": "Validation Error",
//                 "status": 400,
//                 "detail": "One or more request parameters failed validation.",
//                 "errors": {
//                     "confirmPassword": "The confirmation password does not match the password."
//                 }
//             });
//         }

//         // hash pasword | encryrpt password
//         const hashPassword = await bcrypt.hash(password, 10);
//         if (!hashPassword) {
//             return res.status(400).json({
//                 "success": false,
//                 "message": "Pasword Encryption Error"
//             });
//         }

//         // find most recent OTP stored for the user
//         const recentOtp = await findRecentOtpDatabase(email);
//         console.log(recentOtp);

//         // validate otp
//         if ( recentOtp.length == 0 ) {
//             // OTP not found
//             return res.status(400).json({
//                 "success": false,
//                 "message": "OTP Found"
//             });
//         } else if ( otp !== recentOtp.otp ) {
//             // Invalid OTP
//             return res.status(400).json({
//                 "success": false,
//                 "message": "Invalid OTP"
//             });
//         }

//         // save entry in database 
//         const saveUser = await createUserDatabase({
//             firstName, 
//             lastName, 
//             email, 
//             hashPassword,
//             image: `https://api.dicebear.com/10.x/initials/svg?seed=${firstName} ${lastName}`
//         });

//         // success message
//         return res.status(200).json({
//             "success": true,
//             "message": "User register successfully",
//             saveUser
//         });


//     } catch (error) {
//         console.log("Error Occured in Sending OTP to Email", error.mesage);
//         return res.status(500).json({
//             "success": false,
//             "message": "Error Occured in Sending OTP to Email",
//             "error": error
//         });
//     }

// }

// //login
// const login = async (req, res) => {

//     try {
//         // data fetch from request ke body
//         const { email, password } = req.body;

//         // check data properlly import or not
//         if ( !email || !password ) {
//             return res.status(422).json({
//                 "success": false,
//                 "title": "Missing Required Fields",
//                 "status": 422,
//                 "message": "The request body is missing mandatory information required to complete this action.",
//             });
//         }

//         // check user is exit or not in database
//         const checkUserExist = await  checkUserDatabase(email);
//         if ( !checkUserExist ) {
//             return res.status(401).json({
//                 "success": false,
//                 "title": "User Not Exists in Our Knoledeg base",
//                 "status": 409,
//                 "detail": "The provided information is NOT registered in our system.",
//                 "errors": {
//                     "email": `The email address '${email}' is Not Found.`
//                 }
//             });
//         }

//         // validate the password 
//         const passwordValidation = await bcrypt.compare(password, checkUserExist.password);
//         if ( !passwordValidation ) {
//             return res.status(401).json({
//                 "success": false,
//                 "title": "Incurrect Password",
//                 "status": 409,
//                 "detail": "Your password is not match | password is incurrect",
//                 "errors": {
//                     "email": `You password is not match`
//                 }
//             });
//         }

//         // send success responce
//         const payload = {
//             email: checkUserExist.email, 
//             id: checkUserExist.id, 
//             role: checkUserExist.role
//         }

//         const jwt_token = jwt.sign(
//             payload, 
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "2h"
//             }
//         );

        
//         // create cookie and send the response
//         const options = {
//             expires: new Date(Date.now() + 3*24*60*60*1000),
//             httpOnly: true
//         }
//         res.cookie("token", jwt_token, options).status(200).json({
//             "success": true,
//             "message": "User login successfully in the system",
//             "data": checkUserExist
//         })

//     } catch (error) {

//         console.log("Error Occured in Sending OTP to Email", error.mesage);
        
//         return res.status(500).json({
//             "success": false,
//             "message": "Error Occured in Sending OTP to Email",
//             "error": error
//         });

//     }

// }

// //change password
// const changePassword = async (req, res) => {

//     try {
//         Home work
//         // get data from req body
//         // get oldPassword, newPassword, confirm New Password
//         // validate

//         // update pwd in DB
//         // send mail - Password updated
//         // return response

//     } catch (error) {

//         console.log("Error Occured in Sending OTP to Email", error.mesage);
        
//         return res.status(500).json({
//             "success": false,
//             "message": "Error Occured in Sending OTP to Email",
//             "error": error
//         });

//     }

// }

// // Export Module
// module.exports = {
//     SendOTP,
//     signUp,
//     login,
//     changePassword
// }

