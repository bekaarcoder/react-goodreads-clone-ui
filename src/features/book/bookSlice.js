import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
    books: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
    message: "",
};

// Add book
export const addBook = createAsyncThunk(
    "book/addBook",
    async (bookData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.accessToken;
            return await bookService.addBook(token, bookData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const bookSlice = createSlice({
    name: "bookSlice",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = null;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBook.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                state.message = "Book added successfully.";
                console.log(action.payload);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                const { data } = action.payload;
                state.isError = data;
                console.log(action.payload);
            });
    },
});

export const { reset } = bookSlice.actions;

export default bookSlice.reducer;
