import axios from "axios";
import authHeader from "./auth.header";
const API_URL = "http://localhost:8080/api/auth/";

const getAll = () => {
  return axios.get(API_URL + "items", { headers: authHeader() });
};
const get = (id) => {
  return axios.get(API_URL + `items/${id}`, { headers: authHeader() });
};
const create = (data) => {
  return axios.post(API_URL + "items", data, { headers: authHeader() });
};
const update = (id, data) => {
  return axios.put(API_URL + `items/${id}`, data, { headers: authHeader() });
};
const remove = (id) => {
  return axios.delete(API_URL + `items/${id}`, { headers: authHeader() });
};
const findByTitle = (title) => {
  return axios.get(API_URL + `items?title=${title}`, {
    headers: authHeader(),
  });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle,
};
