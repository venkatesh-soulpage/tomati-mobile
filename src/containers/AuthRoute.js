import React from "react";
// Router Imports
import { Route, Redirect } from "react-router-dom";
// Redux imports

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        sessionStorage.getItem("token") &&
        sessionStorage.getItem("isAdmin") === "true" ? (
          <Redirect
            to={{
              pathname: "/dashboard/all-users",
              state: { from: props.location },
            }}
          />
        ) : sessionStorage.getItem("token") &&
          sessionStorage.getItem("isAdmin") === "false" ? (
          <Redirect
            to={{
              pathname: "/outlet",
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
