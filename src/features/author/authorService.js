import axios from "../../axios/axios.js";

const SEARCH_API_URL = "/api/authors/search";

// Search Author
export const searchAuthor = async (keyword) => {
    const response = await axios.get(`${SEARCH_API_URL}/${keyword}`);
    return response.data;
};

const authorService = {
    searchAuthor,
};

export default authorService;
