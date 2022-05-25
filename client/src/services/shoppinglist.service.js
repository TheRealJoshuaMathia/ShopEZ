import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/auth/list/";

const getList = (id) => {

    return axios.get(API_URL + `display/${id}`, { headers: authHeader() });
}

const createList = (data) => {

    return axios.post(API_URL + "/create", data, { headers: authHeader() });
}

export default {
    getList,
    createList,
};