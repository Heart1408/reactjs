import api from "./api";

const getScheduleAPI = (date) => api.get(`/schedule/getdata/${date}`);
const getFloorAPI = () => api.get("/table/getlistfloor");
const getListTableAPI = (floor_id) => api.get(`/table/getlist/${floor_id}`);
const createScheduleAPI = (payload) => api.post(`/schedule/add`, payload);
const updateScheduleAPI = (payload) => api.post(`/schedule/update`, payload);

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
  createScheduleAPI,
  getTableStatusCurrentAPI,
  updateStatusBillAPI,
  paymentConfirmAPI,
  updateScheduleAPI,
};
