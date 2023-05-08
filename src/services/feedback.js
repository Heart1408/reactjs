import api from "./api";

const getFeedbackListAPI = (payload) => api.get(`/feedback/getlist`, payload);
const changeStatusAPI = (id) => api.post(`/feedback/changestatus/${id}`);

export { getFeedbackListAPI, changeStatusAPI };
