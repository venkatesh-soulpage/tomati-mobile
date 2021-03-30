import React from "react";
// Redux
import { connect } from "react-redux";
// Router
import { withRouter, Link } from "react-router-dom";

const VersioningMenu = (props) => {
  console.log(props);
  return (
    <div className="version-style">
      <Link to="/">V</Link>
    </div>
  );
};

function mapStateToProps(state) {
  return { auth: state.auth, outlet: state.outlet };
}

export default withRouter(connect(mapStateToProps)(VersioningMenu));
