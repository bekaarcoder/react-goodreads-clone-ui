import axios from "../../axios/axios.js";

const SEARCH_API_URL = "/api/authors/search";
const ADD_AUTHOR_API_URL = "/api/authors";

// Search Author
const searchAuthor = async (keyword) => {
    const response = await axios.get(`${SEARCH_API_URL}/${keyword}`);
    return response.data;
};

const createAuthor = async (authorData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(ADD_AUTHOR_API_URL, authorData, config);
    return response.data;
};

const getAuthors = async (pageNumber = 0) => {
    const response = await axios.get(
        `${ADD_AUTHOR_API_URL}?pageNumber=${pageNumber}`
    );
    return response.data;
};

const getAuthor = async (authorId) => {
    const response = await axios.get(`${ADD_AUTHOR_API_URL}/${authorId}`);
    return response.data;
};

const updateAuthor = async (authorData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { id } = authorData;

    const response = await axios.put(
        `${ADD_AUTHOR_API_URL}/${id}`,
        authorData,
        config
    );
    return response.data;
};

const authorService = {
    searchAuthor,
    createAuthor,
    getAuthors,
    getAuthor,
    updateAuthor,
};

export default authorService;
