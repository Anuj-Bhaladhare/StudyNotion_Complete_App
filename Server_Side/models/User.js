const pool = require("./../config/database.js");

const checkUserExist = async (email) => {
    try {
        console.log("checkUserExist");
    } catch (error) {
        console.log("Error Occured in Check User Exist in Database")
        throw error;
    }
}


const createUserEntry = async (email) => {
    try {
        console.log("createUserEntry");

        // // CREATE USER QUERY => 
        // const query = `
        //     INSERT INTO users
        //         (first_name, last_name, email, password_hash, account_type)
        //     VALUES
        //         ('anuj', 'Bhaladhare', 'anuj@gmail.com', 'sdfsdf5sdf5sdf584s2d1f5', 'Student');
        // `;

    } catch (error) {
        console.log("Error Occured in Create User Entry in Database")
        throw error;
    }
}


module.exports = {
    checkUserExist,
    createUserEntry
}
