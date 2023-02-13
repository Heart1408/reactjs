import axios from "../axios";

const handleLoginApi = (username, password) => {
  return axios.post("/api/auth/login", {
    username: username,
    password: password,
  });
};

const getCurrentStaff = (headers) => {
  return axios.get("/api/auth/currentStaff", {
    headers: headers,
  });
};

const handleLogout = (headers) => {
  return axios.post("/api/auth/logout", {
    headers: headers,
  });
};

export { handleLoginApi, getCurrentStaff, handleLogout };
