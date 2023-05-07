import { call, put, takeLatest } from "redux-saga/effects";
import { loginAPI, confirmCustomerAPI } from "../../services/auth";
import {
  handleLoginRequest,
  handleLoginResponse,
  handleConfirmCustomerRequest,
  handleConfirmCustomerResponse,
} from "./slice";

function* handleLoginRequestSaga({ payload }) {
  const { data, callback } = payload;
  try {
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

function* handleConfirmCustomerRequestSaga({ payload }) {
  const { data, callback } = payload;
  try {
    const response = yield confirmCustomerAPI(data);
    if (response?.success) {
      yield put(handleConfirmCustomerResponse(response));
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
  yield takeLatest(
    handleConfirmCustomerRequest,
    handleConfirmCustomerRequestSaga
  );
}

export default watchAuth;
