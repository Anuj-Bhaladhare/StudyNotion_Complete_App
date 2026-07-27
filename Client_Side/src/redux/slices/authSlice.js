import { createSlice } from "@reduxjs/toolkit";

const getStoredToken = () => {
    try {
        return JSON.parse(localStorage.getItem("token"));
    } catch {
        return null;
    }
}

const initialState = {
    token: getStoredToken(),
    signupData: null,
    loading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, value) {
            state.token = value.payload
        },

        clearAuth(state, value) {
            state.token = null;
            state.signupData = null;
        },

        setSignupData(state, value) {
            state.signupData = value.payload;
        },

        setLoading(state, value) {
            state.loading = value.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { setToken, clearAuth, setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;
