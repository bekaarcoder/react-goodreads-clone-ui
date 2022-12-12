import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localstorage
const user = JSON.parse(localStorage.getItem("user"));
const current = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
    current: current ? current : null,
    user: user ? user : null,
    isError: null,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register User
export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData);
        } catch (error) {
            console.log(error.response);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

// Login User
export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

// Logout User
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

// Get Current User
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.accessToken;
            return await authService.getCurrentUser(token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isError = null;
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Account created successfully.";
                console.log(action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                const { data } = action.payload;
                state.message = data.message
                    ? data.message
                    : "Some Error Occurred.";
                state.isError = data;
                console.log(action.payload);
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                state.message = "Hey! Welcome back 😎";
                state.user = action.payload;
                console.log(action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                const { data } = action.payload;
                state.message = data.message
                    ? data.message
                    : "Invalid username or password";
                state.isError = data;
                console.log(action.payload);
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.current = null;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                console.log(action.payload);
                state.current = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                const { data } = action.payload;
                state.isError = data;
                state.current = null;
            });
    },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
