import axios from "../../axios/axios";

const REGISTER_API_URL = "/api/auth/register";
const LOGIN_API_URL = "/api/auth/login";

// Register User
const register = async (userData) => {
    const response = await axios.post(REGISTER_API_URL, userData);
    return response.data;
};

// Login User
const login = async (userData) => {
    const response = await axios.post(LOGIN_API_URL, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const authService = {
    register,
    login,
};

export default authService;
