import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    initialState: false,
    name: "auth",
    reducers: {
        login: (state) => state = false,
    }
});

// Action creators are generated for each case reducer function
export const { authSlice } = authSlice.actions;
export default authSlice.reducer;
