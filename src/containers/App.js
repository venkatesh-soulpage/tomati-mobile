import React from "react";
// Router Imports
import { Router, Route, Switch } from "react-router-dom";
import history from "utils/history";
// Redux component connect
import { connect } from "react-redux";
import * as Action from "_actions";
// Layouts
import Home from "components/home";
import Info from "components/info";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import Login from "pages/auth/Login";
import Outlet from "pages/Outlet";
import QrScanner from "pages/QrScanner";
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
    <Router history={history}>
      <Header />
      <Switch>
        <AuthRoute path="/" exact component={Login} />
        <PrivateRoute path="/scanner" component={QrScanner} />
        <Route exact path="/outlet" component={Outlet} />
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(App);
