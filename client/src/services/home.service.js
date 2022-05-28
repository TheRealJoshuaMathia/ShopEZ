import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/auth/homes/";

const getHomes = () => {
  return axios.get(API_URL + "showall", { headers: authHeader() });
};

const getUserHomes = (username) => {
  return axios.get(API_URL + `userhomes/${username}`, {
    headers: authHeader(),
  });
};

const createHome = (homename) => {
  return axios.post(API_URL + "add", { homename }, { headers: authHeader() });
};

const addUserToHome = (data) => {
  return axios.post(API_URL + "adduser", data, { headers: authHeader() });
};

const getHomeShoppingLists = (homename) => {
  return axios.get(API_URL + `showlists/${homename}`, {
    headers: authHeader(),
  });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getHomes,
  getUserHomes,
  createHome,
  addUserToHome,
  getHomeShoppingLists,
};
