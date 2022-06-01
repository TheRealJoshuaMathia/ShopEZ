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
  return axios.post(
    API_URL + "add",
    { name: homename },
    { headers: authHeader() }
  );
};

const addUserToHome = (username, homename) => {
  return axios.post(
    API_URL + "adduser",
    { username: username, name: homename },
    { headers: authHeader() }
  );
};

const getHomeShoppingLists = (homename) => {
  return axios.get(API_URL + `showlists/${homename}`, {
    headers: authHeader(),
  });
};
// eslint-disable-next-line import/no-anonymous-default-export
const HomeService = {
  getHomes,
  getUserHomes,
  createHome,
  addUserToHome,
  getHomeShoppingLists,
};
export default HomeService;
