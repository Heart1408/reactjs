import { combineReducers } from 'redux';

import { namespace as AuthenticationNameSpace } from './login/slice';
import authReducer from './login/slice.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'authentication',
  storage: storage,
  blacklist: [],
};

export default combineReducers({
  [AuthenticationNameSpace]: persistReducer(authPersistConfig, authReducer),
});
