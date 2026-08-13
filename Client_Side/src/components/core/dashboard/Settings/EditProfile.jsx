import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast";
import { auth, profileEndpoint } from "./../../../../services/apis.js";
import relayService from "./../../../../services/axios/hook.js";

import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {

  const [ profileDetails, setProfileDetails ] = useState(null);
  const [ userDetails, setUserDetails ] = useState(null);

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // GET USER DETAILS
  const getUserDetails = async () => {
    try {

      const result = await relayService({
        url: auth.GET_USER_BY_ID + `/${user.id}`, 
        method: "GET"
      });

      if (result?.data?.success) {
        setUserDetails(result?.data?.data);
      }

    } catch (error) {
      console.log("getUserDetails ERROR ====> ", error);
    }
  }

  // GET PROFILE DETAILS
  const getProfileDetails = async () => {

    try {

      const result = await relayService({
        url: profileEndpoint.GET_PROFILE_DETAILS + `/${user.id}`, 
        method: "GET"
      });

      if (result?.data?.success) {
        setProfileDetails(result?.data?.data);
      }

    } catch (error) {
      console.log("getProfileDetails ERROR ====> ", error);
    }

  }

  useEffect( () => {
    if (!user?.id) return

    getUserDetails();
    getProfileDetails();

  }, [user?.id]);

  const [ profileFormData, setProfileFormData ] = useState({
    "firstName": "",
    "lastName": "",
    "dateOfBirth": "",
    "gender": "",
    "contactNumber": "",
    "about": ""
  });

  useEffect( () => {
    setProfileFormData({
      "firstName": userDetails?.first_name ?? "",
      "lastName": userDetails?.last_name ?? "",
      "dateOfBirth": profileDetails?.date_of_birth?.split("T")[0] ?? "",
      "gender": profileDetails?.gender ?? "",
      "contactNumber": profileDetails?.contact_number ?? "",
      "about": profileDetails?.about ?? ""
    });
  }, [userDetails, profileDetails]);

  const updateUserProfileHandler = async (form_data) => {
    try {
      const result = await relayService({
        url: profileEndpoint.UPDATE_USER_PROFILE + `/${user.id}`,
        method: "PUT",
        data: {
          "date_of_birth": form_data.dateOfBirth, 
          "gender": form_data.gender,
          "contact_number": form_data.contactNumber, 
          "about": form_data.about
        }
      });

      console.log("updateUserProfileHandler: ", result);

      return result?.data?.success === true ? true : false ;

    } catch (error) {
      console.log("updateUserHandler ERROR ====> ", error);
    }
  }

  const updateUserHandler = async (form_data) => {
    try {
      const result = await relayService({
        url: auth.UPDATE_USER_DETAILS + `/${user.id}`,
        method: "PUT",
        data: {
          "first_name": form_data.firstName,
          "last_name": form_data.lastName, 
          "phone_number": form_data.contactNumber
        }
      });

      console.log("updateUserHandler: ", result);

      return result?.data?.success === true ? true : false ;


    } catch (error) {
      console.log("updateUserHandler ERROR ====> ", error);
    }
  }

  const submitProfileForm = async (event) => {

    event.preventDefault();

    if ( updateUserHandler(profileFormData) && updateUserProfileHandler(profileFormData) ) {
      toast.success("Profile Updated");
    } else {
      toast.error("Something Went Wrong");
    }

  }

  return (
    <>
      <form onSubmit={submitProfileForm}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="text-white">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"  
                value={profileFormData.firstName}
                onChange={ (event) => {
                  setProfileFormData( (prev) => ({
                    ...prev,
                    "firstName": event.target.value
                  }))
                }}
                
              />
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="text-white">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                value={profileFormData.lastName}
                onChange={ (event) => {
                  setProfileFormData( (prev) => ({
                    ...prev,
                    "lastName": event.target.value
                  }))
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="text-white">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                value={profileFormData.dateOfBirth}
                onChange={ (event) => {
                  setProfileFormData( (prev) => ({
                    ...prev,
                    "dateOfBirth": event.target.value
                  }))
                }}
              />
              
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="text-white">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                value={profileFormData.gender}
                onChange={ (event) => {
                  setProfileFormData( (prev) => ({
                    ...prev,
                    "gender": event.target.value
                  }))
                }}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="text-white">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                value={profileFormData.contactNumber}
                onChange={ (event) => {
                  setProfileFormData( (prev) => ({
                    ...prev,
                    "contactNumber": event.target.value
                  }))
                }}
              />
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="text-white">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pr-12 text-richblack-5"
                value={profileFormData.about}
                onChange={ (event) => {
                  setProfileFormData( (prev) => ({
                    ...prev,
                    "about": event.target.value
                  }))
                }}
              />   
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
          >
            Save
          </button>
        </div>
      </form>
    </>
  )

}
