const pool = require("./../config/database.js");

const contactUsModule = async ({email, first_name, last_name, message, phone_no, country_code}) => {
    try {

        const result = await pool.query(
            `
                INSERT INTO contact_us
                    (first_name, last_name, email, message, phone, country_code)
                VALUES
                    ($1, $2, $3, $4, $5, $6)
                RETURNING id;
            `, 
            [first_name, last_name, email, message, phone_no, country_code]
        );

        return result.rows ? result.rows[0].id : false;
       
    } catch (error) {

        console.log("Error Occured in ContacUs Module: ", error);
        throw new error;

    }
}

module.exports = {
    contactUsModule
}
