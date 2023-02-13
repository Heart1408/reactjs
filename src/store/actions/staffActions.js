import actionTypes from "./actionTypes";

export const staffLoginSuccess = (staffInfo) => ({
  type: actionTypes.STAFF_LOGIN_SUCCESS,
  staffInfo: staffInfo,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
