const BASE_URL = process.env.REACT_APP_BASE_URL;

export const auth = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    FORGOT_PASSWORD_API: BASE_URL + "/auth/forgot-password",
    GET_USER_BY_ID: BASE_URL + "/auth/user/get-user",
    UPDATE_USER_DETAILS: BASE_URL + "/auth/user/update-user",
    UPDATE_USER_PASSWORD: BASE_URL + "/auth/change-password"
    
}

export const email = {
    VERIFY_EMAIL: BASE_URL + "/email/email-verification",
    RESEND_VERIFY_EMAIL: BASE_URL + "/email/resend-verification-otp"
} 

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/category/show-all-category"
}

export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/anuj"
}

export const profileEndpoint = {
    GET_PROFILE_DETAILS: BASE_URL + "/profile/get-profile",
    UPDATE_USER_PROFILE: BASE_URL + "/profile/update-profile"
}

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile"
}
