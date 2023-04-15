const selectAuthentication = {
  getAuthenticationToken: (state) => {
    return state?.AuthenticationSlice?.authenticationToken
  }
};

export const selectedCurrentUser = (state) => {
  return state?.AuthenticationSlice?.currentUser;
}

export default selectAuthentication;
