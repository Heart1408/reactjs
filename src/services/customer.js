import api from "./api";

const getCustomersAPI = (payload) => api.get(`/customer/getlist`, payload);
const getCustomerInfoAPI = (booking_id) =>
  api.get(`/customer/getinfo/${booking_id}`);
const getBookingInfoAPI = (payload) =>
  api.get(`/customer/getBookingInfo`, payload);

export { getCustomersAPI, getCustomerInfoAPI, getBookingInfoAPI };
