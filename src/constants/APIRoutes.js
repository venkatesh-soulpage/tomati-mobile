//AWS
export const AWS_DESKTOP_URL = "https://desktop.tomati.app";
export const AWS_API_URL = "https://api.tomati.app";
//AWS-staging
//AWS
export const AWS_STAGING_DESKTOP_URL = "https://staging-desktop.tomati.app";
export const AWS_STAGING_API_URL = "https://staging-api.tomati.app";
//VERCEL
export const VERCEL_DESKTOP_URL = "https://tomati-desktop.vercel.app";
export const HEROKU_API_URL = "https://tomati-api.herokuapp.com";

export const DESKTOP_URL =
  process.env.REACT_APP_AWS === "true"
    ? AWS_DESKTOP_URL
    : process.env.REACT_APP_VERCEL === "true"
    ? VERCEL_DESKTOP_URL
    : process.env.REACT_APP_AWS_STAGING === "true"
    ? AWS_STAGING_DESKTOP_URL
    : "http://localhost:3002";

// Auth Routes
export const CLIENT_REGISTER = "/api/auth/user-signup";
export const GET_EMAIL_OTP = "/api/verifications/email/get-code";
export const GET_LOCATIONS = "/api/outletlocations";
export const CHECK_EMAIL_CODE = "/api/verifications/email/check-code";
export const GET_PLANS = "/api/plans";
export const GET_DISCOUNT = "/api/payment/get-coupon";
//Verification
export const VERIFY_CREDENTIALS = "/api/auth/verify-credentials";
//Payment
export const PAYMENT_URL = "/api/payment";
