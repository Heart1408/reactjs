import { combineReducers } from "redux";

import staffReducer from "./StaffReducer";

const allReducers = combineReducers({
  'staff': staffReducer,
});

export default allReducers;
