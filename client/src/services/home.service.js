import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/auth/homes/";

const getHomes = () => {

    return axios.get(API_URL + "showall", { headers: authHeader() });
}

const getUserHomes = (username) => {
    return axios.get(API_URL + `/${username}`);
}

const createHome = (data) => {
    return axios.post(API_URL + "/add", data, { headers: authHeader() });
}

const addUserToHome = (data) => {
    return axios.post(API_URL + "/adduser", data, { headers: authHeader() });
}

const getHomeShoppingLists = (homename) => {
    return axios.get(API_URL + `showlists/${homename}`, { headers: authHeader() });
}

export default {
    getHomes,
    getUserHomes,
    createHome,
    addUserToHome,
    getHomeShoppingLists,
};