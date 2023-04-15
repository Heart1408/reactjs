import { all } from 'redux-saga/effects';
import watchAuth from './login/saga';

function* rootSaga() {
  yield all([
    watchAuth()
  ]);
}
export default rootSaga;
