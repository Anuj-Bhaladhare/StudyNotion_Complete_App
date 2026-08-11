import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
    user: localStorage.getItem("user") ? jwtDecode(JSON.parse(localStorage.getItem("user"))) : null,
    loading: false
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload
        },
        setLoading(state, value) {
            state.loading = value.payload
        }
    }
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
