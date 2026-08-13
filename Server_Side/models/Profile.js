const pool = require("./../config/database.js");

// prifile is have -> || UPDATE || GET || DELETE || 

const finedProfileDetailByIdModule = async (user_id) => {
    try {
        
        const result = await pool.query(
            `
                SELECT * FROM profiles WHERE user_id = $1
            `, 
            [user_id]
        );

        return result?.rows.length === 0 ? null : result?.rows[0];

    } catch (error) {

        console.log("Error Occured in fined Profile Detail By Id in Database", error);
        throw error;

    }
}


const deleteAccountModule = async () => {
    try {
        
        console.log("deleteAccount");

    } catch (error) {

        console.log("Error Occured in delete Account in Database", error);
        throw error;

    }
}


const updateProfileModule = async (id, date_of_birth, gender, contact_number, about) => {
    try {
        
        const result = await pool.query(
            `
                UPDATE profiles
                SET date_of_birth = $1, gender = $2, contact_number = $3, about = $4
                WHERE user_id = $5;
            `,
            [date_of_birth, gender, contact_number, about, id]
        );

        return result.rowCount === 1 ? true : false;

    } catch (error) {

        console.log("Error Occured in update Profile in Database", error);
        throw error;

    }
}


const getAllUserDetailsModule = async () => {
    try {
        
        console.log("");

    } catch (error) {

        console.log("Error Occured in get All User Details in Database", error);
        throw error;

    }
}


const getEnrolledCoursesModule = async () => {
    try {
        
        console.log("");

    } catch (error) {

        console.log("Error Occured in get Enrolled Courses in Database", error);
        throw error;

    }
}


const updateDisplayPictureModule = async () => {
    try {
        
        console.log("");

    } catch (error) {

        console.log("Error Occured in update Display Picture in Database", error);
        throw error;

    }
}


const instructorDashboardModule = async () => {
    try {
        
        console.log("");

    } catch (error) {

        console.log("Error Occured in instructor Dashboard in Database", error);
        throw error;

    }
}


module.exports = {
    finedProfileDetailByIdModule,
    deleteAccountModule,
    updateProfileModule,
    getAllUserDetailsModule,
    getEnrolledCoursesModule,
    updateDisplayPictureModule,
    instructorDashboardModule
}
