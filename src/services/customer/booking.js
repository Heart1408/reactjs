import api from "../api";

const addDishToMenuAPI = (product_id) =>
  api.post(`/customer/addProduct/${product_id}`);
const getOrderedDishesAPI = () => api.get(`/customer/booking`);
const deleteDishAPI = (product_id) =>
  api.post(`/customer/deleteProduct/${product_id}`);
const confirmOrderAPI = (payload) =>
  api.post(`/customer/confirmOrder`, payload);
const sendFeedbackAPI = (payload) =>
  api.post(`/customer/sendFeedback`, payload);

export {
  addDishToMenuAPI,
  getOrderedDishesAPI,
  deleteDishAPI,
  confirmOrderAPI,
  sendFeedbackAPI,
};
