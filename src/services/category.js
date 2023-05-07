import api from "./api";

const getCategoryAPI = () => api.get(`/category/getlist`);
const listProductAPI = (payload) => api.get(`/product/getlist`, payload);
const createCategoryAPI = (payload) => api.post(`/category/add`, payload);
const updateCategoryAPI = (payload) => api.post(`/category/edit`, payload);
const deleteCategoryAPI = (id) => api.post(`/category/delete/${id}`);

const createProductAPI = (payload) =>
  api.postMultiplePart(`/product/add`, payload);

export {
  getCategoryAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
  createProductAPI,
  listProductAPI,
};
