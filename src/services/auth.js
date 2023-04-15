import api from "./api";

export const loginAPI = (payload) => api.post("/auth/login", payload);
export const getCurrentStaffAPI = () => api.get("/auth/currentStaff");
