const { findLatestOtpByEmail } = require("./../models/OTP.js");
const { verifyUserDatabase } = require("./../models/User.js");

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

module.exports = {
    verifyUserEmail
}
