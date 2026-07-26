const BASE_URL = process.env.REACT_APP_BASE_URL;

export const auth = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup"
}

export const email = {
    VERIFY_EMAIL: BASE_URL + "/email/email-verification"
} 

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/category/show-all-category"
}

