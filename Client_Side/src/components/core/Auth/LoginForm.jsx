import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import relayService from "./../../../services/axios/hook.js";
import { auth } from "./../../../services/apis.js";
// Redux State managemnt - globle state
import { useAppDispatch, useAppSelector } from "./../../../redux/hooks/index.ts"
import { setToken } from "./../../../redux/slices/authSlice.js";
import { setUser } from "./../../../redux/slices/profileSlice.js";


const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [ showPassword, setShowPassword ] = useState(false);
    const [ loginFormData, setLoginFormData ] = useState({
        email: null, 
        password: null
    });

    // Login API Calling
    const handleOnSubmit = async (event) => {
        event.preventDefault();

        try {
            
            const login_result = await relayService({
                url: auth.LOGIN_API,
                method: "POST",
                data: {
                    "email": loginFormData.email, 
                    "password": loginFormData.password
                }
            })

            console.log("login_result ===> ", login_result);

            if ( login_result?.status === 200 && login_result?.data?.success ) {

                // User Data and JWT Token store in local-storage
                localStorage.setItem("token", JSON.stringify(login_result?.data?.data?.user));
                localStorage.setItem("user", JSON.stringify(login_result?.data?.data?.token));

                // set JWT Token
                dispatch(setToken(login_result?.data?.data?.token));

                // set User
                dispatch(setUser(login_result?.data?.data?.user));

                // // Configure your API client
                // axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

                // Redirect the user
                navigate("/user/dashboard");

            }

        } catch (error) {

            if ( error?.response?.data?.title === "User Not Exists is System" ) {

                toast.error(error?.response?.data?.detail);
                navigate("/signup");
                 
            } else if (error?.response?.data?.title === "User Not Verified") {

                toast.error(error?.response?.data?.message);

                navigate("/verify-user", {
                    state: {
                        email: loginFormData.email,
                        resend_it: true
                    }
                });

            } else if (error?.response?.data?.title === "Invalid password.") {

                toast.error(error?.response?.data?.message);

                setLoginFormData( (prev) => ({
                    ...prev,
                    password: ""
                }))

            } else {

                toast.error("Something Went Wrong");
                console.log("login error ====> ", error.response);

            }
            
        }

    }

    return (
        <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex w-full flex-col gap-y-4"
        >
            <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="email"
                    value={loginFormData.email}
                    onChange={(event) => {
                        setLoginFormData( (prev) => ({
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
            <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginFormData.password}
                    onChange={ (event) => {
                        setLoginFormData( (prev) => ({
                            ...prev,
                            password: event.target.value
                        }));
                    }}
                    placeholder="Enter Password"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
                <Link to="/forgot-password">
                    <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                        Forgot Password
                    </p>
                </Link>
            </label>
            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Sign In
            </button>
        </form>
    )

}

export default LoginForm;
