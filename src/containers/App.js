import React from "react";
// Router Imports
import { Router, Route, Switch } from "react-router-dom";
import history from "../utils/history";
// Redux component connect
import { connect } from "react-redux";

// Layouts
import Home from "../components/home";
import Info from "../components/info";

function App(props) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" name="home" exact component={Home} />
        <Route exact path="/info" name="info" component={Info} />
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(App);
