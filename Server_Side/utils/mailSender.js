const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false, // true for 465, false for 587
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // Send mail
        const info = await transporter.sendMail({
            from: `"StudyNotion | AnujTECH" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = mailSender;