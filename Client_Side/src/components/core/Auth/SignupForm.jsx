import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { ACCOUNT_TYPE } from "./../../../utils/constants.js";
import Tab from "./../../common/Tab.jsx";
import relayService from "./../../../services/axios/hook.js";
import { auth } from "./../../../services/apis.js";

const SignupForm = () => {

    const navigate = useNavigate();
    const [ accountType, setAccountType ] = useState(ACCOUNT_TYPE.STUDENT);
    const [ signupFormData, setSignupFormData ] = useState({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null
    });
    const [ showPassword, setShowPassword ] = useState({
        password: false,
        confirmPassword: false
    });

    // data to pass to Tab component
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR
        },
    ]

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        console.log("handleOnSubmit");
        try {

            const signup_response = await relayService({
                url: auth.SIGNUP_API, 
                method: "POST", 
                data: {
                    first_name: signupFormData.firstName,
                    last_name: signupFormData.lastName,
                    email: signupFormData.email,
                    password: signupFormData.password,
                    confirm_password: signupFormData.confirmPassword,
                    account_type: accountType
                }
            });

            if ( signup_response?.status === 201 && signup_response?.data?.success === true ) {
                navigate("/verify-user", {
                    state: {
                        email: signupFormData.email
                    }
                });
            }

        } catch (error) {
            console.log("Signup Error -> ", error);
        }
    }

    return (
        <div>
            {/* Tab */}
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />
            {/* Form */}
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
                <div className="flex gap-x-4">
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={signupFormData.firstName}
                            onChange={ (event) => {
                                setSignupFormData( (prev) => ({
                                    ...prev, 
                                    firstName: event.target.value
                                }))
                            }}
                            placeholder="Enter first name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={signupFormData.lastName}
                            onChange={(event) => {
                                setSignupFormData( (prev) => ({
                                    ...prev, 
                                    lastName: event.target.value
                                }))
                            }}
                            placeholder="Enter last name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                </div>
                <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="email"
                    value={signupFormData.email}
                    onChange={(event) => {
                        setSignupFormData( (prev) => ({
                            ...prev, 
                            email: event.target.value
                        }))
                    }}
                    placeholder="Enter email address"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
                </label>
                <div className="flex gap-x-4">
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword.password ? "text" : "password"}
                            name="password"
                            value={signupFormData.password}
                            onChange={(event) => {
                                setSignupFormData( (prev) => ({
                                    ...prev, 
                                    password: event.target.value
                                }))
                            }}
                            placeholder="Enter Password"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => ({
                                    ...prev,
                                    password: !prev.password
                                }))
                            }
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {showPassword.password ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                        </span>
                    </label>
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword.confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={signupFormData.confirmPassword}
                            onChange={(event) => {
                                setSignupFormData( (prev) => ({
                                    ...prev, 
                                    confirmPassword: event.target.value
                                }))
                            }}
                            placeholder="Confirm Password"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => ({
                                    ...prev,
                                    confirmPassword: !prev.confirmPassword
                                }))
                            }
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {showPassword.confirmPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm;
