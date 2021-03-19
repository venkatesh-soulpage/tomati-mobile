import axios from "axios";
import {
  AWS_API_URL,
  HEROKU_API_URL,
  AWS_STAGING_API_URL,
} from "constants/APIRoutes";

if (process.env.REACT_APP_VERCEL) {
  axios.defaults.baseURL = HEROKU_API_URL;
} else if (process.env.REACT_APP_AWS) {
  axios.defaults.baseURL = AWS_API_URL;
} else if (process.env.REACT_APP_AWS_STAGING) {
  axios.defaults.baseURL = AWS_STAGING_API_URL;
} else {
  axios.defaults.baseURL = "http://127.0.0.1:3000";
}

(function () {
  var token = sessionStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
})();
