import axios from "../../axios/axios";

const ADD_BOOK_API_URL = "api/books";

// Add book
const addBook = async (token, bookData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(ADD_BOOK_API_URL, bookData, config);
    return response.data;
};

const bookService = {
    addBook,
};

export default bookService;
