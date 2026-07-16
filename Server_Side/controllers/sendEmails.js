
const { insert_OTP_Database } = require("./../models/OTP.js")
const mailSender = require("./../utils/mailSender.js");

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

module.exports = {
    sendVerificationEmail
}


