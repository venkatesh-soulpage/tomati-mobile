import React from "react";
// Router Imports
import { Router, Route, Switch } from "react-router-dom";
import history from "utils/history";
// Redux component connect
import { connect } from "react-redux";
import * as Action from "_actions";
// Layouts
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import Login from "pages/auth/Login";
import Outlet from "pages/Outlet";
import QrScanner from "pages/QrScanner";
import Terms from "pages/Terms";
import Privacy from "pages/Privacy";
import Header from "components/Header";

function App(props) {
  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      props.dispatch(Action.getUserData());
      props.dispatch(Action.handleIsUserAuthenticated(true));
    } else {
      props.dispatch(Action.handleIsUserAuthenticated(false));
    }
  }, [sessionStorage.getItem("token")]);
  React.useEffect(() => {
    //checking role of user logged in

    if (sessionStorage.getItem("role") === "WAITER") {
      if (props?.auth?.userData?.outlet?.outletvenue_id) {
        history.push({
          pathname: "/outlet",
          search: `outlet_venue=${props?.auth?.userData?.outlet?.outletvenue_id}`,
        });
      }
    }
  }, [props?.auth?.userData]);
  return (
    <div className="h-100">
      <Router history={history}>
        {/* <Header /> */}
        <Switch>
          <AuthRoute path="/" exact component={Login} props={props} />
          <PrivateRoute path="/scanner" component={QrScanner} />
          <Route exact path="/outlet" component={Outlet} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/privacy" component={Privacy} />
        </Switch>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(App);
