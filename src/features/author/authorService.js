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

const authorService = {
    searchAuthor,
    createAuthor,
};

export default authorService;
