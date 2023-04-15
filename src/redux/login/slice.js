import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticationToken: '',
  currentUser: {},
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    handleLoginRequest: (state, action) => {
      console.log('hahaha')
      return ({
      ...state,
    })},
    handleLoginResponse: (state, action) => {
      const { user_info, token } = action.payload;
      return {
        ...state,
        authenticationToken: token,
        currentUser: {
          ...state.currentUser,
          ...user_info,
        },
      };
    },
    handleLogout: (state, action) => ({
      authenticationToken: '',
        currentUser: {},
    }),
  },
});

export const { 
  handleLoginRequest, 
  handleLoginResponse,
  handleLogout,
} = AuthenticationSlice.actions;

export const namespace = 'AuthenticationSlice';

export default AuthenticationSlice.reducer;
