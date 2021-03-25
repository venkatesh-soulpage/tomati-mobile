import React from "react";
// Router Imports
import { Route, Redirect } from "react-router-dom";
// Redux imports
import { decode } from "utils/tokenUtils";

function AuthRoute({ component: Component, ...rest }) {
  const token = sessionStorage.getItem("token");
  if (token) {
    const decoded = decode(token);
    let { scope, role, is_age_verified } = decoded;
    sessionStorage.setItem("role", role);
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        sessionStorage.getItem("token") &&
        sessionStorage.getItem("role") !== "WAITER" ? (
          <Redirect
            to={{
              pathname: "/scanner",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default AuthRoute;
