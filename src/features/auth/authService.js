import axios from "../../axios/axios";

const REGISTER_API_URL = "/api/auth/register";
const LOGIN_API_URL = "/api/auth/login";
const GET_USER_API_URL = "/api/users/current";

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

// Logout User
const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
};

// Get Current User
const getCurrentUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(GET_USER_API_URL, config);
    if (response.data) {
        localStorage.setItem("currentUser", JSON.stringify(response.data));
    }
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;
