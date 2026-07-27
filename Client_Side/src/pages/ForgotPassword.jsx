import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import relayService from "./../services/axios/hook.js";
import { email, auth } from "./../services/apis.js";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [ emailSent, setEmailSent ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ forgotPasswordData, setForgotPasswordData ] = useState({
        email: "",
        password: "",
        confirm_password: "",
        email_otp: ""
    });

    // Send Email to User for new OTP
    const sendResetEmailHandler = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const send_email_result = await relayService({
                url: email.RESEND_VERIFY_EMAIL, 
                method: "POST",  
                data: {
                    email: forgotPasswordData.email
                }
            });

            if ( send_email_result?.data?.success ) {

                setLoading(false);
                setEmailSent(true);

                toast.success(send_email_result?.data?.message);
                console.log(send_email_result);

            }

        } catch (error) {

            if ( error?.response?.data?.title === "User Not Exists is System" ) {
                toast.error(error?.response?.data?.detail);  
                navigate("/signup")              
            } else {
                toast.error("Something Went Wrong");
                console.log("Resend OTP Handler Error ==> ", error.response);
            }
        }
    }

    // Reset Password Function
    const resetPasswordHandler = async (event) => {
        event.preventDefault();
        
        try {

            const send_email_result = await relayService({
                url: auth.FORGOT_PASSWORD_API, 
                method: "POST",  
                data: {
                    email: forgotPasswordData.email,
                    email_otp: forgotPasswordData.email_otp,
                    password: forgotPasswordData.password,
                    confirm_password: forgotPasswordData.confirm_password
                }
            });

            if ( send_email_result?.data?.success && send_email_result?.data?.title === "Password Update successfully." ) {

                toast.success(send_email_result?.data?.message)
                navigate("/login");

            }

        } catch (error) {
            console.log("error", error.response);

            start error handling page OK || start from here
        }

    }


    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        Forgot My Password
                    </h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        { !emailSent ?
                            "Don't worry, it happens to the best of us! Enter your email below, and we will get you back into your account in no time." :
                            forgotPasswordData.email
                        }
                    </p>
                    <form onSubmit={ (event) => {
                            emailSent ? 
                                resetPasswordHandler(event) : 
                                sendResetEmailHandler(event)
                            }
                        }
                    >

                        { !emailSent && 
                            <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Email Address <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    type="email"
                                    name="email"
                                    value={forgotPasswordData.email}
                                    onChange={ (event) => {
                                        setForgotPasswordData( (prev) => ({
                                            ...prev,
                                            email: event.target.value
                                        }))
                                    }}
                                    placeholder="Enter email address"
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                />
                            </label>
                        }
                        
                        { emailSent && 
                            <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    type="text"
                                    name="password"
                                    value={forgotPasswordData.password}
                                    onChange={ (event) => {
                                        setForgotPasswordData( (prev) => ({
                                            ...prev,
                                            password: event.target.value
                                        }))
                                    }}
                                    placeholder="Enter new password"
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                />
                            </label>
                        }

                        { emailSent && 
                            <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Confirm Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    type="text"
                                    name="confirm_password"
                                    value={forgotPasswordData.confirm_password}
                                    onChange={ (event) => {
                                        setForgotPasswordData( (prev) => ({
                                            ...prev,
                                            confirm_password: event.target.value
                                        }))
                                    }}
                                    placeholder="Enter New Confirm Password"
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                />
                            </label>
                        }

                        { emailSent && 
                            <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Email OTP <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    type="text"
                                    name="email_otp"
                                    value={forgotPasswordData.email_otp}
                                    onChange={ (event) => {
                                        setForgotPasswordData( (prev) => ({
                                            ...prev,
                                            email_otp: event.target.value
                                        }))
                                    }}
                                    placeholder="Enter Email OTP"
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                />
                            </label>
                        }

                        <button
                            type="submit"
                            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                        >
                            {emailSent ? "Submit" : "Send Email"}
                        </button>

                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                            <p className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack /> Back To Login
                            </p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ForgotPassword;
