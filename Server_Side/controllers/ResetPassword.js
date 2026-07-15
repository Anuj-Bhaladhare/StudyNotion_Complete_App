const User = require("./../models/User.js");
const mailSender = require("./../mailSender.js");
const bcrypt = require("bcrypt");

// Reset Password Token
const resetPasswordToken = async (req, res) => {
    try {

        // get email from req body
        const { email } = req.body.email;

        // check user for this email, email validation
        const user = await findUserDatabase(email);
        if ( !user ) {
            return res.status(500).json({
                "success": false,
                "message": "Your Email is not registered with us"
            });
        }

        // generate token
        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 5*60*60*1000
            },
            {new: true}
        )

        // create url
        const url = `http://localhost:3000/update-password/${token}`;

        // send mail containing the url
        await mailSender(
            email, 
            `Password Reset Link`,
            `Password Reset Link: ${url}`
        );

        // return response
        return res.status(500).json({
            "success": true,
            "message": "Password Reset url successfull send the Your Email"
        });
        

    } catch (error) {
        console.log("Error Occured in Reset Password Token", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Reset Password Token",
            "error": error
        });
    }
} 


// Reset Password
const resetPassword = async (req, res) => {
    try {
        // data fetch
        const { token, password, confirmPassword } = req.body;

        // validation
        if ( !token || !password || !confirmPassword ) {
            return res.status(401).json({
                "success": false,
                "message": "Please Fill all the details properlly"
            });
        }

        if ( password !== confirmPassword ) {
            return res.status(401).json({
                "success": false,
                "message": "Password is not matching"
            });
        }

        // get userdetails from db using token
        const userDetails = await user.findOne({token: token});

        // if no entry - invalid token
        if ( !userDetails ) {
            return res.status(401).json({
                "success": false,
                "message": "Token is invalid"
            });
        }

        // token time check
        if ( userDetails.resetPasswordExpire < Date.now() ) {
            return res.status(401).json({
                "success": false,
                "message": "Token is Expire, please generate the token"
            });
        }
        // password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // update password
        const User.findOneandUpdate(
            {
                token,
                password,
                new
            }
        )

        // return response
        return res.status(500).json({
            "success": true,
            "message": "Password Reset url successfully"
        });

    } catch (error) {
        console.log("Error Occured in Reset Password", error.mesage);
        return res.status(500).json({
            "success": false,
            "message": "Error Occured in Reset Password",
            "error": error
        });
    }
} 

module.exports = {
    resetPasswordToken,
    resetPassword
}
