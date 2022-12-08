import axios from "axios";

const BASE_URL = "http://localhost:8081";
const API_URL = "http://localhost:8081/api/auth/register";

const my_axios = axios.create({
    baseURL: BASE_URL,
});

// Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};

const authService = {
    register,
};

export default authService;
