import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice.js";
import userSlice from "./reducers/userSlice.js";

export const store = configureStore({
    reducer: {
        user: userSlice,
        auth: authSlice
    },
});

export default store;