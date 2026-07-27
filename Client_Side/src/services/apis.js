const BASE_URL = process.env.REACT_APP_BASE_URL;

export const auth = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    FORGOT_PASSWORD_API: BASE_URL + "/auth/forgot-password"
    
}

export const email = {
    VERIFY_EMAIL: BASE_URL + "/email/email-verification",
    RESEND_VERIFY_EMAIL: BASE_URL + "/email/resend-verification-otp"
} 

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/category/show-all-category"
}
