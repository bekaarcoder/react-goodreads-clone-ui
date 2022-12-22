import axios from "../../axios/axios";

const ADD_BOOK_API_URL = "api/books";
const GET_BOOKS_API_URL = "api/books";

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

// Get Books
const getBooks = async (pageNumber = 0) => {
    const response = await axios.get(
        `${GET_BOOKS_API_URL}?pageNumber=${pageNumber}`
    );
    return response.data;
};

const bookService = {
    addBook,
    getBooks,
};

export default bookService;
