const selectAuthentication = {
  getAuthenticationToken: (state) => {
    return state?.AuthenticationSlice?.authenticationToken;
  },
};

export const selectConfirmCustomer = {
  getCustomerToken: (state) => {
    return state?.AuthenticationSlice?.confirmCustomerToken;
  },
};

export const selectedCurrentUser = (state) => {
  return state?.AuthenticationSlice?.currentUser;
};

export default selectAuthentication;
