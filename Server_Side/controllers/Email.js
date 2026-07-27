const { findLatestOtpByEmail, insert_OTP_Database } = require("../models/OTP.js");
const { verifyUserDatabase, findUserByEmail } = require("../models/User.js");
const mailSender = require("./../utils/mailSender.js");
const { generateOTP } = require("./../models/OTP.js");


const sendVerificationEmail = async ( email, email_otp, purpose ) => {
    try {

        const title = "Email Verification Code";

        const body = `
            Hello,

            Your OTP for email verification is: ${email_otp}

            Please enter this code to verify your email address. This OTP is valid for 10 minutes.

            Thank you!
        `;

        const mail_send_result = await mailSender(email, title, body);

        if ( mail_send_result.accepted[0] == email) {
            
            // Save OTP in Database
            const db_result = await insert_OTP_Database(email, email_otp, purpose);

            return db_result;
        
        }

    } catch (error) {
        console.log("send Verification Email Error", error);
        throw error;
    }
}


const verifyUserEmail = async (req, res) => {

    try {

        // get data from request body
        const { email, otp } = req.body;

        // validate data
        if ( !email || !otp ) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required."
            });
        }

        // find recent otp by mail
        const recent_otp = await findLatestOtpByEmail(email);

        if ( !recent_otp ) {
            return res.status(404).json({
                "success": false,
                "message": "OTP not found."
            });
        }

        // send expire otp responce
        if (recent_otp.expires_at < Date.now() ) {
            return res.status(401).json({
                "success": false,
                "message": "OTP has expired."
            });
        }

        // compair OTP and send response
        if ( otp !== recent_otp.otp ) {
            return res.status(401).json({
                "success": true,
                "message": "Invalid OTP."
            });
        } 

        const verify_result = await verifyUserDatabase(email);
        if ( verify_result ) {
            return res.status(200).json({
                success: true,
                message: "Email verified successfully."
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Email Not verified."
            });
        }

    } catch (error) {
        console.log("Error Occured in Verify User Email Controller", error);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Verify User Email Controller",
            "error": error
        });
    }
}


// Resend OTP to User Email
const resendOTP = async (req, res) => {
    try {
        // Fetch data from Request body
        const { email } = req.body;

        // check data is available
        if ( !email ) {
            return res.status(404).json({
                "success": false,
                "title": "User Email Not Found",
                "errors": {
                    "email": `Please Provide Email Address.`
                }
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
              
                return res.status(201).json({
                    "success": true,
                    "message": "Resend an OTP email to the user."
                });
            
            } else {
                return res.status(404).json({
                    "success": false,
                    "wrong_email": "Wrong Email Address",
                    "message": "Wrong Email Address. Please Provide Correct Email"
                });
            }
        }



    } catch (error) {
        console.log("Error Occured in Resend OTP", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Change Password Controller",
            "error": error
        });
    }
}


module.exports = {
    verifyUserEmail,
    sendVerificationEmail,
    resendOTP
}
