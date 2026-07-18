const pool = require("./../config/database.js");


const findUserByEmail = async (email) => {
    try {
        const result = await pool.query(
            `
                SELECT * FROM users WHERE email = $1 LIMIT 1;
            `,
            [email]
        );

        return result.rows.length > 0 ? result.rows[0] : null;

    } catch (error) {
        console.error("Error finding user by email:", error);
        throw new Error("Failed to fetch user from database.");
    }
};


const createUserEntry = async (
    first_name,
    last_name,
    email,
    hash_password,
    account_type,
    phone_number = null
) => {
    try {
        const { rows } = await pool.query(
            `
            INSERT INTO users (
                first_name,
                last_name,
                email,
                password_hash,
                account_type,
                phone_number
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, first_name, last_name, email, account_type, phone_number, created_at;
            `,
            [first_name, last_name, email, hash_password, account_type, phone_number]
        );

        return rows[0];

    } catch (error) {

        console.error("Database Error [createUserEntry]:", error);
        throw error;

    }

};


const verifyUserDatabase = async (email) => {
    try {
        const db_result = await pool.query(
            `
                UPDATE users
                SET is_verified = TRUE
                WHERE email = $1;
            `,
            [email]
        );

        return db_result?.rowCount === 1 ? true : false;


    } catch (error) {

        console.error("Database Error [verifyUserDatabase]:", error.message);
        throw error;

    }
}


const findUserByUserId = async (user_id) => {
    try {

        const result = await pool.query(
            `
                SELECT * FROM users WHERE id = $1;
            `,
            [user_id]
        );

        return result.rows.length > 0 ? result.rows[0] : null;

    } catch (error) {

        console.error("Database Error [verifyUserDatabase]:", error.message);
        throw error;

    }
}


module.exports = {
    findUserByEmail,
    createUserEntry,
    verifyUserDatabase,
    findUserByUserId
}

