import { AuthService } from "services";
import axios from "axios";
import * as ActionTypes from "constants/ActionTypes";

/* ================================================================== */
/* User Login */
/* ================================================================== */
/**
 * User Login with email and password
 * common for all the user (broker, admin, client)
 * @param {*} postData
 */
export function userLogin(postData) {
  return async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.HANDLE_LOGIN_REQUEST,
      });
      const responseData = await AuthService.postLoginDetails(postData);
      dispatch({
        type: ActionTypes.HANDLE_LOGIN_SUCCESS,
        payload: responseData,
      });
      dispatch(setAuthTokenInSession("token", responseData.token));
      dispatch(handleIsUserAuthenticated());
      dispatch(getUserData());
      return responseData;
    } catch (errorData) {
      dispatch(handleLoginError(errorData));
    }
  };
}
/**
 * Set the auth Token in the session storage with key and value
 * @param {*} key
 * @param {*} value
 */
export function setAuthTokenInSession(key, value) {
  return function (dispatch) {
    sessionStorage.setItem(key, value);
  };
}
/* ================================================================== */
/* User Auth Token Handling */
/* ================================================================== */
/**
 * After the user login handling user auth token handling
 * using axios request Header
 * @param {*} payload
 */
export function handleIsUserAuthenticated() {
  var token = sessionStorage.getItem("token");
  let payload;
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    payload = true;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
    payload = false;
  }
  return {
    type: ActionTypes.HANDLE_IS_USER_AUTHENTICATED,
    payload: payload,
  };
}
/* ================================================================== */
/* Get USer */
/* ================================================================== */
/**
 * Requesting User Details
 * @param {*} getData
 */
export function getUserData() {
  return async (dispatch) => {
    try {
      const responseData = await AuthService.getUserData();
      dispatch(receiveUserData(responseData));
    } catch (errorData) {}
  };
}
/**
 * Storing User Details to access across the App
 * @param {*} userData
 */
export function receiveUserData(userData) {
  return {
    type: ActionTypes.RECEIVE_USER_DATA,
    payload: userData,
  };
}
/**
 * Login Error Response
 * @param {*} error
 */
export function handleLoginError(error) {
  return {
    type: ActionTypes.HANDLE_LOGIN_ERROR,
    payload: error,
  };
}
