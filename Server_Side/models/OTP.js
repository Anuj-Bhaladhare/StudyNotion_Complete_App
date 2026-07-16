const pool = require("./../config/database.js");


// a function -> to send emails
const insert_OTP_Database = async (email, email_otp, purpose) => {
    try {

        const result = await pool.query(
            `
                INSERT INTO otp
                    (email, otp, purpose)
                VALUES
                    ($1, $2, $3);
            `,
            [email, email_otp, purpose]
        );

        return result?.rowCount === 1 ? true : false;            
        
    } catch (error) {
        console.log("Error Occured in Create OTP Entry in Database", error);
        throw error;
    }
}


const findLatestOtpByEmail = async (email) => {
    try {

        const { rows } = await pool.query(
            `
            SELECT *
            FROM otp
            WHERE email = $1
            ORDER BY created_at DESC
            LIMIT 1;
            `,
            [email]
        );

        return rows[0] || null;

    } catch (error) {
        console.log("Error Occured in Create OTP Entry in Database", error);
        throw error;
    }
}


module.exports = {
    insert_OTP_Database,
    findLatestOtpByEmail
}
