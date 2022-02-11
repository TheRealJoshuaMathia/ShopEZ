import http from "../axiosLoader";

const getAll = () => {
  return http.get("/items");
};
const get = (itemId) => {
  return http.get(`/items/${itemId}`);
};
const create = (data) => {
  return http.post("/items", data);
};
const update = (itemId, data) => {
  return http.put(`/items/${itemId}`, data);
};
const remove = (itemId) => {
  return http.delete(`/items/${itemId}`);
};
const findByTitle = (title) => {
  return http.get(`/items?title=${title}`);
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
