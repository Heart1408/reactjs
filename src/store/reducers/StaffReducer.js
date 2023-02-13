import actionTypes from "../actions/actionTypes";
import cookies from "react-cookies";

const initialState = {
  isLoggedIn: false,
  staffInfo: cookies.load("staff"),
};

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STAFF_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        staffInfo: action.staffInfo,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        staffInfo: null,
      };
    default:
      return state;
  }
};

export default staffReducer;
