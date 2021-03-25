import { combineReducers } from "redux";
import auth from "./auth";
import outlet from "./outlet";

export default combineReducers({
  auth,
  outlet,
});
