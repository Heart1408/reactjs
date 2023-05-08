import api from "./api";

const getStaffsAPI = (payload) => api.get(`/staff/getlist`, payload);
const createStaffAPI = (payload) => api.post(`/staff/add`, payload);
const updateStaffAPI = (payload) => api.post(`/staff/edit`, payload);
const deleteStaffAPI = (id) => api.post(`/staff/delete/${id}`);

export { getStaffsAPI, createStaffAPI, updateStaffAPI, deleteStaffAPI };
