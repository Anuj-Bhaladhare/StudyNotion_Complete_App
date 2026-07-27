import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import OtpInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "./../redux/hooks/index.ts";
import { email } from "./../services/apis.js";
import relayService from "./../services/axios/hook.js";

const VerifyEmail = () => {

    const { loading, signupData } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useAppDispatch();

    const [ formState, setFormState ] = useState({
        email: location.state?.email,
        otp: null
    });


    // Resend OTP to User Email
    const resendOTPHandler = async () => {
        if (formState.email) {
            try {
                const resend_otp_result = await relayService({
                    url: email.RESEND_VERIFY_EMAIL, 
                    method: "POST", 
                    data: {
                        email: formState.email
                    }
                })

                if ( resend_otp_result?.data?.success ) {

                    toast.success(resend_otp_result?.data?.message);

                }
            } catch (error) {

                toast.error("Something Went Wrong");
                console.log("Resend OTP Handler Error ==> ", error.response);

            }
        } else {
            toast.error("Something Went Wrong - Please SignUp First");
            navigate("/signup");
        }
        
    }

    useEffect( () => {
        if ( location.state?.resend_it ) {
            resendOTPHandler();
        }
    }, []);

    
    const handleVerifyAndSignup = async (event) => {
        event.preventDefault();

        if ( formState.otp === null ) {
            toast.error("Please Provide Email OTP");
        } else {
            try {
                const verify_email_result = await relayService({
                    url: email.VERIFY_EMAIL, 
                    method: "POST", 
                    data: {
                        email: formState.email, 
                        otp: formState.otp
                    }
                });

                if ( verify_email_result?.status === 200 && verify_email_result?.data?.success === true ) {
                    toast.success("User Verified Successfully");
                    navigate("/login", {
                        state: {
                            email: formState.email
                        }
                    });
                }

            } catch (error) {

                if ( error?.response?.data?.message === "OTP has expired." ) {
                    toast.error("OTP has expired, Please Re-Generate Email OTP");
                    setFormState( (prev) => ({
                        ...prev,
                    otp: null
                    }))
                }  else if ( error?.response?.data?.message === "Invalid OTP.") {
                    toast.error("Invalid OTP, Please Correct OTP");
                    setFormState( (prev) => ({
                        ...prev,
                    otp: null
                    }))
                } else {
                    toast.error("Something Went Wrong");
                    console.log("handle Verify AndS ignup Error ==> ", error.response );
                }
            }
        }
    }

    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {loading ? (
                <div>
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                        Verify Email
                    </h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                        A verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={handleVerifyAndSignup}>
                        <OtpInput
                            value={formState.otp}
                            onChange={ (otp) => {
                                setFormState( (prev) => ({
                                    ...prev,
                                    otp
                                }))
                            }}
                            numInputs={6}
                            renderInput={(props) => (
                            <input
                                {...props}
                                placeholder="-"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                            />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />
                        <button
                            type="submit"
                            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                        >
                        Verify Email
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/signup">
                            <p className="text-richblack-5 flex items-center gap-x-2">
                                <BiArrowBack /> Back To Signup
                            </p>
                        </Link>
                        <button
                            className="flex items-center text-blue-100 gap-x-2"
                            onClick={() => resendOTPHandler()}
                        >
                        <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail;
