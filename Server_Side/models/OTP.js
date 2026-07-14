const mailSender = require("./../utils/mailSender.js")

// a function -> to send emails
const sendVerificationEmail = async (email, otp) => {

    try {

        const mailResponce = await mailSender(email, "verification Email from StudyNotion", otp);

        console.log("Email send successfully: ", mailResponce)

    } catch (error) {

        console.log("error occured while sending mails:", error.message);
        return error.message;

    }

}

