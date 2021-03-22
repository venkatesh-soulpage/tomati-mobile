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
  return (
    <Router history={history}>
      <Header />
      <Switch>
        {/* <Route path="/" name="home" exact component={Home} />
        <Route exact path="/info" name="info" component={Info} /> */}
        <AuthRoute path="/" exact component={Login} />
        <PrivateRoute
          path="/scanner"
          component={QrScanner}
          // scopesRequired={['AGENCY', 'OUTLET']}
          // rolesRequired={['OWNER', 'MANAGER', 'STAFF', 'WAITER']}
        />
        <PrivateRoute
          exact
          path="/outlet"
          component={Outlet}
          // scopesRequired={[]}
          // rolesRequired={[]}
        />
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(App);
