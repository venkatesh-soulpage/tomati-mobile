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

  // const { outletvenue_id, outletevent_id } = user.outlet;
  //       history.push({
  //         pathname: '/outlet',
  //         search: outletevent_id
  //           ? `outlet_event=${outletevent_id}`
  //           : `outlet_venue=${outletvenue_id}`,
  //       });
  return (
    <Route
      {...rest}
      render={(props) =>
        sessionStorage.getItem("token") &&
        sessionStorage.getItem("role") === "WAITER" ? (
          <Redirect
            to={{
              pathname: "/outlet",
              state: { from: props.location },
            }}
          />
        ) : sessionStorage.getItem("token") ? (
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
