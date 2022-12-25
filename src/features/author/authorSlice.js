import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorService from "./authorService";

const initialState = {
    author: null,
    content: {},
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

// Create Author
export const createAuthor = createAsyncThunk(
    "author/createAuthor",
    async (authorData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.accessToken;
            return await authorService.createAuthor(authorData, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

// Get All Authors
export const getAuthors = createAsyncThunk(
    "author/getAuthors",
    async (pageNumber, thunkAPI) => {
        try {
            return await authorService.getAuthors(pageNumber);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

// Get Author by ID
export const getAuthor = createAsyncThunk(
    "author/getAuthor",
    async (authorId, thunkAPI) => {
        try {
            return await authorService.getAuthor(authorId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

// Update author
export const updateAuthor = createAsyncThunk(
    "author/updateAuthor",
    async (authorData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.accessToken;
            return await authorService.updateAuthor(authorData, token);
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
            state.author = null;
            state.content = {};
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
            })
            .addCase(createAuthor.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAuthor.fulfilled, (state, action) => {
                state.loading = false;
                state.isError = null;
                state.isSuccess = true;
                state.message = "Author created successfully";
            })
            .addCase(createAuthor.rejected, (state, action) => {
                state.loading = false;
                const { data } = action.payload;
                state.isError = data;
                state.isSuccess = false;
                console.log(action.payload);
            })
            .addCase(getAuthors.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAuthors.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.isError = null;
                state.content = action.payload;
            })
            .addCase(getAuthors.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                const { data } = action.payload;
                state.isError = data;
                state.content = {};
            })
            .addCase(getAuthor.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAuthor.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.isError = null;
                state.author = action.payload;
            })
            .addCase(getAuthor.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                const { data } = action.payload;
                state.isError = data;
                state.author = null;
            })
            .addCase(updateAuthor.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAuthor.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.isError = null;
                state.message = "Author updated Successfully";
            })
            .addCase(updateAuthor.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                console.log(action.payload);
                const { data } = action.payload;
                state.isError = data;
                state.author = null;
            });
    },
});

export const { reset } = authorSlice.actions;

export default authorSlice.reducer;
