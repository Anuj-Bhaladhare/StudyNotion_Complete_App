const {
    finedProfileDetailByIdModule,
    deleteAccountModule,
    updateProfileModule,
    getAllUserDetailsModule,
    getEnrolledCoursesModule,
    updateDisplayPictureModule,
    instructorDashboardModule
} = require("./../models/Profile.js");


const getProfileDetailByID = async (req, res) => {
    try {

        const { user_id } = req.params;

        if (user_id) {

            const db_result =  await finedProfileDetailByIdModule(user_id);

            if (db_result) {
                return res.status(200).json({
                    "success": true,
                    "message": "Profile Details Get Successfully",
                    "data": db_result
                });
            } else {
                return res.status(404).json({
                    "success": false,
                    "message": "Profile Not Found"
                });
            }

        }   

    } catch (error) {

        console.log("Error Occured in get Profile Detail By ID Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in delete Account Controller",
            "error": error
        });

    }
}

const deleteAccount = async (req, res) => {
    try {

        const { user_id } = req.body;



    } catch (error) {

        console.log("Error Occured in delete Account Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in delete Account Controller",
            "error": error
        });

    }
}


const updateProfile = async (req, res) => {
    
    try {        
        const { date_of_birth, gender, contact_number, about } = req.body;
        const { id } = req.params;

        console.log(date_of_birth, gender, contact_number, about, id)

        if ( id ) {

            const db_result = await updateProfileModule(id, date_of_birth, gender, contact_number, about);

            if (db_result) {
                return res.status(200).json({
                    "success": true,
                    "message": "Profile Update successfully."
                });
            } else {
                return res.status(404).json({
                    "success": false,
                    "message": "Profile Not Update."
                });
            }
        }

    } catch (error) {

        console.log("Error Occured in update Profile Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in update Profile Controller",
            "error": error
        });

    }
}


const getAllUserDetails = async (req, res) => {
    try {

    } catch (error) {

        console.log("Error Occured in get All User Details Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in get All User Details Controller",
            "error": error
        });

    }
}


const getEnrolledCourses = async (req, res) => {
    try {

    } catch (error) {

        console.log("Error Occured in get Enrolled Courses Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in get Enrolled Courses Controller",
            "error": error
        });

    }
}


const updateDisplayPicture = async (req, res) => {
    try {

    } catch (error) {

        console.log("Error Occured in get Enrolled Courses Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in get Enrolled Courses Controller",
            "error": error
        });

    }
}


const instructorDashboard = async (req, res) => {
    try {

    } catch (error) {

        console.log("Error Occured in get Enrolled Courses Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in get Enrolled Courses Controller",
            "error": error
        });

    }
}


module.exports = {
    getProfileDetailByID,
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    getEnrolledCourses,
    updateDisplayPicture,
    instructorDashboard
}



