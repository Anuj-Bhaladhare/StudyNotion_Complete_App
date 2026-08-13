const { contactUsEmail } = require("./../mail/templates/contactFormRes.js");
const { mailSender } = require("./../utils/mailSender.js");
const { contactUsModule } = require("./../models/ContactUs.js");


const contactUsController = async (req, res) => {
    try {

        const { email, first_name, last_name, message, phone_no, country_code } = req.body;
        
        const db_result = await contactUsModule({email, first_name, last_name, message, phone_no, country_code});

        if (db_result) {

            return res.status(200).json({
                success: true,
                message: "Contact Us Form Successfully Submited...",
                data: db_result
            });

        } else {

            return res.status(400).json({
                success: false,
                message: "Contact Us Form Not Submited..."
            });

        }

    } catch (error) {

        console.log("Error Occured in Contact Us Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Contact Us Controller",
            "error": error
        });

    }
}

module.exports = {
    contactUsController
}
