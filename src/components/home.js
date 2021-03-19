import React from "react";
// Redux component connect
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function home(props) {
  console.log(props, "PROPS");
  const { first_name, last_name } = props.auth;
  return (
    <div>
      <h1>Home component</h1>
      <h1>{first_name} from Store</h1>
      <h1>{last_name} from Store redux</h1>
    </div>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(home));
