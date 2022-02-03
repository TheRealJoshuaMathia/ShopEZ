import http from "../axiosLoader";
class ItemDataService {

    getAll() {
        return http.get("/items");
    }
    get(id) {
        return http.get(`"/items/${id}`);
    }
    create(data) {
        return http.post("/items", data);
    }
    update(id, data) {
        return http.put(`"/items/${id}`, data);
    }
    delete(id) {
        return http.delete(`"/items/${id}"`);
    }
    findByTitle(title) {
        return http.get(`"/items?title=${title}`);
    }

}
export default new ItemDataService();