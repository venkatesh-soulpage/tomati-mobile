import React from "react";
// Redux
import { connect } from "react-redux";
// Router
import { withRouter, Link } from "react-router-dom";

const VersioningMenu = (props) => {
  console.log(props);
  return (
    <div className="version-style d-flex align-items-center justify-content-around w-75">
      <Link className="text-white" to="/terms">
        Terms
      </Link>
      <Link className="text-white" to="/privacy">
        Privacy
      </Link>
    </div>
  );
};

function mapStateToProps(state) {
  return { auth: state.auth, outlet: state.outlet };
}

export default withRouter(connect(mapStateToProps)(VersioningMenu));
