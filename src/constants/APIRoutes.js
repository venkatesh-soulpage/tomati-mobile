//AWS
export const AWS_API_URL = "https://api.tomati.app";
export const AWS_MOBILE_URL = "https://mobile.tomati.app/login";

//AWS-staging
export const AWS_STAGING_API_URL = "https://staging-api.tomati.app";

//VERCEL
export const HEROKU_API_URL = "https://tomati-api.herokuapp.com";

export const LOCAL_DESKTOP_URL = "http://localhost:3002";

export const MOBILE_APP_URL =
  process.env.REACT_APP_AWS === "true"
    ? AWS_MOBILE_URL
    : "http://localhost:3002";

//auth
export const CLIENT_LOGIN = "/api/auth/login";
export const GET_USER = "/api/accounts/me";

//outlet
export const GET_OUTLET = "/api/outletvenues";
