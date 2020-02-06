const initialState = {
  auth: {
    currentUser: {},
    isLoggedIn: false,
    isFetching: false,
    grants: [],
  },
  loader: {
    isLoading: false,
  },
};

export default initialState;
