import http from "../axiosLoader";
class ItemDataService {
  getAll() {
    return http.get("/items");
  }
  get(itemId) {
    return http.get(`/items/${itemId}`);
  }
  create(data) {
    return http.post("/items", data);
  }
  update(itemId, data) {
    return http.put(`/items/${itemId}`, data);
  }
  delete(itemId) {
    return http.delete(`/items/${itemId}`);
  }
  findByTitle(title) {
    return http.get(`/items?title=${title}`);
  }
}
export default new ItemDataService();
