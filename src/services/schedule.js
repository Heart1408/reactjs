import api from "./api";

const getScheduleAPI = (date) => api.get(`/schedule/getdata/${date}`);
const getFloorAPI = () => api.get("/table/getlistfloor");
const getListTableAPI = (floor_id) => api.get(`/table/getlist/${floor_id}`);
const getCustomerInfoAPI = (booking_id) =>
  api.get(`/customer/getinfo/${booking_id}`);
const createScheduleAPI = (payload) => api.post(`/schedule/add`, payload);
const getTableStatusCurrentAPI = (table_id) =>
  api.get(`/table/getStatusCurrent/${table_id}`);
const updateStatusBillAPI = (payload) =>
  api.post(`/table/updateStatusBill`, payload);
const paymentConfirmAPI = (payload) =>
  api.post(`/table/paymentConfirm`, payload);

export {
  getScheduleAPI,
  getFloorAPI,
  getListTableAPI,
  getCustomerInfoAPI,
  createScheduleAPI,
  getTableStatusCurrentAPI,
  updateStatusBillAPI,
  paymentConfirmAPI,
};
