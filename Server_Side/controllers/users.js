const { findUserByUserId, updateUserByUserId } = require("./../models/User.js");

const getUserByIdController = async (req, res) => {
    
    try {
        const { id } = req.params;

        if ( id ) {

            const db_result = await findUserByUserId(id);
            
            return res.status(200).json({
                "success": true,
                "message": "User get successfully.",
                "data": {
                    "id": db_result.id,
                    "first_name": db_result.first_name,
                    "last_name": db_result.last_name,
                    "email": db_result.email,
                    "account_type": db_result.account_type,
                    "profile_id": db_result.profile_id,
                    "is_active": db_result.is_active,
                    "is_verified": db_result.is_verified,
                    "phone_number": db_result.phone_number
                }
            });

        }

    } catch (error) {
        console.log("Error Occured getUser By Id Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in getUser By Id Controller",
            "error": error
        });
    }

}


const updateUserByIdController = async (req, res) => {
    
    try {        
        const { first_name, last_name, phone_number } = req.body;
        const { id } = req.params;

        console.log(first_name, last_name, phone_number, id)

        if ( id ) {

            const db_result = await updateUserByUserId(id, first_name, last_name, phone_number);

            if (db_result) {
                return res.status(200).json({
                    "success": true,
                    "message": "User Update successfully."
                });
            } else {
                return res.status(404).json({
                    "success": false,
                    "message": "User Not Update."
                });
            }
        }

    } catch (error) {
        console.log("Error Occured Update User By Id Controller", error.message);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Update User",
            "error": error
        });
    }

}


module.exports = { 
    getUserByIdController,
    updateUserByIdController
}
