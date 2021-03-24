import * as ActionTypes from "../constants/ActionTypes";

var initialState = {
  isAuthenticated: false,
  isFetching: false,
  loginSuccess: null,
  loginError: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_USER_DATA:
      return {
        ...state,
        userData: action.payload,
        isFetching: false,
      };
    case ActionTypes.HANDLE_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.HANDLE_LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    case ActionTypes.HANDLE_IS_USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case ActionTypes.HANDLE_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
}
