import React, { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-hot-toast";
import { auth } from "./../../../../services/apis.js";
import relayService from "./../../../../services/axios/hook.js";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function UpdatePassword() {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState({
    "current_password": false,
    "new_password": false
  });  
  
  const [password, setPassword] = useState({
    "current_password": "",
    "new_password": ""
  });

  const submitPasswordForm = async (event) => {
    event.preventDefault();

    try {
      const result = await relayService({
        url: auth.UPDATE_USER_PASSWORD + `/${user.id}`,
        method: "PUT",
        data: {
          current_password: password.current_password,
          new_password: password.new_password,
        },
      });

      if (result?.data?.success === true) {
        toast.success(result?.data?.title);
        setPassword( (prev) => ({
          ...prev,
          "current_password": "",
          "new_password": ""
        }));
      } else {
        toast.error("Password Not Update");
        setPassword( (prev) => ({
          ...prev,
          "current_password": "",
          "new_password": ""
        }));
      }

    } catch (error) {

      if (error?.response?.data?.message === "Current Password is Incorrect.") {
        toast.error(error?.response?.data?.message);
        setPassword( (prev) => ({
          ...prev,
          "current_password": ""
        }));
      }
      console.log(error?.response);
    }
  };

  return (
    <>
      <form onSubmit={submitPasswordForm}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="text-white">
                Current Password
              </label>
              <input
                type={showPassword.current_password ? "text" : "password"}
                name="current_password"
                id="current_password"
                value={password.current_password}
                onChange={ (event) => {
                  setPassword( (prev) => ({
                    ...prev,
                    "current_password": event.target.value
                  }))
                }}
                placeholder="Enter Current Password"
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
              />
              <span
                onClick={ (event) => {
                  setShowPassword((prev) => ({
                    ...prev,
                    "current_password": !showPassword.current_password
                  })
                )}}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword.current_password ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="text-white">
                New Password
              </label>
              <input
                type={showPassword.new_password ? "text" : "password"}
                name="new_password"
                id="new_password"
                value={password.new_password}
                onChange={ (event) => {
                  setPassword( (prev) => ({
                    ...prev,
                    "new_password": event.target.value
                  }))
                }}
                placeholder="Enter New Password"
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
              />
              <span
                onClick={ (event) => {
                  setShowPassword((prev) => ({
                    ...prev,
                    "new_password": !showPassword.new_password
                  })
                )}}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword.new_password ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>              
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 bg-yellow-50 flex items-center"
            disabled={password.current_password === "" && password.new_password === ""}
          >
            Update
          </button>
        </div>
      </form>
    </>
  )
}
