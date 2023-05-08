import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticationToken: "",
  confirmCustomerToken: "",
  currentUser: {},
};

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    handleLoginRequest: (state, action) => {
      return {
        ...state,
      };
    },
    handleLoginResponse: (state, action) => {
      const { user_info, token } = action.payload;
      console.log("test", action.payload);
      return {
        ...state,
        authenticationToken: token,
        currentUser: {
          ...state.currentUser,
          ...user_info,
        },
      };
    },
    handleConfirmCustomerRequest: (state, action) => {
      return {
        ...state,
      };
    },
    handleConfirmCustomerResponse: (state, action) => {
      const { token } = action.payload;
      return {
        ...state,
        confirmCustomerToken: token,
      };
    },
    handleLogout: (state, action) => ({
      authenticationToken: "",
      currentUser: {},
    }),
  },
});

export const {
  handleLoginRequest,
  handleLoginResponse,
  handleConfirmCustomerRequest,
  handleConfirmCustomerResponse,
  handleLogout,
} = AuthenticationSlice.actions;

export const namespace = "AuthenticationSlice";

export default AuthenticationSlice.reducer;
