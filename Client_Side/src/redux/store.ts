import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./slices/authSlice.js";
import profileSlice from "./slices/profileSlice.js";
import courseSlice from "./slices/courseSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        course: courseSlice
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
