import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorService from "./authorService";

const initialState = {
    authors: [],
    loading: false,
    isSuccess: false,
    isError: null,
    message: "",
};

// Search Author
export const searchAuthor = createAsyncThunk(
    "author/searchAuthor",
    async (keyword, thunkAPI) => {
        try {
            return await authorService.searchAuthor(keyword);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = null;
            state.loading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchAuthor.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchAuthor.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.authors = action.payload;
                state.message = "";
                state.isError = null;
            })
            .addCase(searchAuthor.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.isError = action.payload;
            });
    },
});

export default authorSlice.reducer;
