import http from "../axiosLoader";

const getAll = () => {
  return http.get("/items");
};
const get = (id) => {
  return http.get(`/items/${id}`);
};
const create = (data) => {
  return http.post("/items", data);
};
const update = (id, data) => {
  return http.put(`/items/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/items/${id}`);
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
