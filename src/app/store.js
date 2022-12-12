import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import authorReducer from "../features/author/authorSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        author: authorReducer,
    },
});
