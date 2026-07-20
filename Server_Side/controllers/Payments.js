const { instance } = require("./../config/razorpay.js");
const mailSender = require("./../utils/mailSender.js");

const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");


// capture the payment and initiate the Razorpay order
const capturePayment = async (req, res) => {
    try {

        // get courseId and UserID
        const { course_id } = req.body;
        const { user_id } = req.params.id;

        // validation

        // valid courseID
        if ( !course_id ) {
            return res.json({
                "success": false,
                "message": "Please provide valid course ID",
            });
        }

        // valid course Details

    } catch (error) {

    }
}


// verify Signature of Razerpay and Server
const verifySignature = async (req, res) => {
    try {

    } catch (error) {

    }
}


