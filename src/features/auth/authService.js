// import axios from "axios";

// const BASE_URL = "http://localhost:8081";
import axios from "../../axios/axios";
const API_URL = "/api/auth/register";

// Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};

const authService = {
    register,
};

export default authService;
