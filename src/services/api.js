import { throttle } from "lodash";
import axios from "axios";

import validate from "../utils/validate";
import { HTTP_STATUS_CONTSTANTS } from "../constants/index";

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

const HEADERS_MULTIPLE_PART = {
  ...HEADERS,
  "Content-Type": "multipart/form-data; boundary=something",
  Accept: "application/json",
};

export const getToken = (token) => {
  HEADERS["Authorization"] = `Bearer ${token}`;
  HEADERS_MULTIPLE_PART["Authorization"] = `Bearer ${token}`;
};

const getFullUrl = (url) => {
  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  // http://127.0.0.1:8000/api
  // console.log(`${process.env.REACT_APP_API_URL}` + url);
  // return `${process.env.REACT_APP_API_URL}` + url;
  console.log(`http://127.0.0.1:8000/api` + url);
  return `http://127.0.0.1:8000/api` + url;
};

const resetToLogin = () => {
  const promiseList = [];
  // promiseList.push(localStorage.removeItem('persist:root'));
};

const throttledResetToLogin = throttle(resetToLogin, 500, {
  leading: false,
  trailing: true,
});

const checkErrorStatus = (response) => {
  if (response?.meta?.code === 0 || response?.data?.isVerified === false) {
    return response;
  }
  if (response?.meta?.errorCode) {
    if (response?.meta?.errorCode !== "E0") {
      // showMessage(typeOfMessage.ERROR, `message.${response?.meta?.errorCode}`, response?.meta?.extraInfo);
    } else {
      // showMessage(typeOfMessage.ERROR, response?.meta?.msg);
    }
  }
  return response;
};

const api = {
  post: (endpoint, params = null) => {
    return axios
      .post(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status ===
              HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return response?.status;
          }
          return checkErrorStatus(response.data);
        },
        (err) => {
          return err;
        }
      )
      .catch((response) => {
        return response.data;
      });
  },

  postMultiplePart: (endpoint, params = null) => {
    return axios
      .post(getFullUrl(endpoint), params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status ===
              HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response.data);
        },
        (err) => {
          return err;
        }
      )
      .catch((response) => {
        return response.data;
      });
  },

  get: (endpoint, params = {}) => {
    return axios
      .get(getFullUrl(endpoint), {
        params: params,
        headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status ===
              HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data);
          }
          console.log("response :>> ", response);
          return checkErrorStatus(response?.data);
        },
        (err) => {
          return err;
        }
      )
      .catch((response) => {
        return response.data;
      });
  },

  put: (endpoint, params = null) => {
    return axios
      .put(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status ===
              HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data);
          }
          return checkErrorStatus(response?.data);
        },
        (err) => {
          return err;
        }
      )
      .catch((response) => {
        return response.data;
      });
  },

  patch: (endpoint, params = null) => {
    return axios
      .patch(getFullUrl(endpoint), params, {
        headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status ===
              HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return checkErrorStatus(response?.data);
          }
          return checkErrorStatus(response?.data);
        },
        (err) => {
          return err;
        }
      )
      .catch((response) => {
        return response.data;
      });
  },

  delete: (endpoint, params) => {
    return axios
      .delete(getFullUrl(endpoint), {
        params: params,
        headers: HEADERS,
        validateStatus: (status) => validate.validateStatus(status),
      })
      .then(
        (response) => {
          if (
            response?.status === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401 ||
            response?.data?.meta?.extraInfo?.status ===
              HTTP_STATUS_CONTSTANTS.ERROR_CODE_401
          ) {
            throttledResetToLogin(endpoint, params, response);
            return response?.data;
          }
          return checkErrorStatus(response.data);
        },
        (err) => {
          return err;
        }
      )
      .catch((response) => {
        return response.data;
      });
  },
};

export default api;
