import api from "./api";

const getCategoryAPI = () => api.get(`/category/getlist`);
const createCategoryAPI = (payload) => api.post(`/category/add`, payload);
const updateCategoryAPI = (payload) => api.post(`/category/edit`, payload);
const deleteCategoryAPI = (id) => api.post(`/category/delete/${id}`);

export {
  getCategoryAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
};
