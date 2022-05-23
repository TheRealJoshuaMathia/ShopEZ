import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080:/api/auth/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
}

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
}

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
}

const getCaregiverBoard = () => {
    return axios.get(API_URL + "caregiver", { headers: authHeader() });
}

const getShopperBoard = () => {
    return axios.get(API_URL + "shopper", { headers: authHeader() });
}

const userService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
    getCaregiverBoard,
    getShopperBoard
}

export default userService;