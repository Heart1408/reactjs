import { call, put, takeLatest } from "redux-saga/effects";
import { loginAPI } from "../../services/auth";
import { handleLoginRequest, handleLoginResponse } from "./slice";

function* handleLoginRequestSaga({ payload }) {
  const { data, callback } = payload;
  try {
    console.log("abc");
    const response = yield loginAPI(data);
    if (response?.success) {
      yield put(handleLoginResponse(response));
      yield call(callback, true);
    } else {
      yield call(callback, false, response?.message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* watchAuth() {
  yield takeLatest(handleLoginRequest, handleLoginRequestSaga);
}

export default watchAuth;
