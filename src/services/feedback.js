import api from "./api";

const getFeedbackListAPI = (payload) => api.get(`/feedback/getlist`, payload);

export { getFeedbackListAPI };
