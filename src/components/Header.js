import React from "react";
import { Nav } from "react-bootstrap";
import {
  AiFillInfoCircle,
  AiOutlineScan,
  AiFillHome,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import Logo from "assets/images/tomatiapp.png";
// Redux
import { connect } from "react-redux";
// Router
import { withRouter, Link } from "react-router-dom";
import * as Action from "_actions";

const Header = (props) => {
  const [open, setOpen] = React.useState(false);

  const { isAuthenticated } = props?.auth;

  return (
    <div style={{ padding: "10px" }}>
      <div
        id="mySidenav"
        className="sidenav"
        style={open ? { width: "90%" } : { width: 0 }}
      >
        <span className="closebtn" onClick={() => setOpen(false)}>
          &times;
        </span>
        <Link to="/">
          <img src={Logo} className="logo" />
        </Link>
        <Nav>
          <Link to="/">
            <Nav.Item
              onClick={() => {
                setOpen(false);
              }}
              eventKey="/"
            >
              <AiFillHome className="mr-4 mt-n1" />
              Home
            </Nav.Item>
          </Link>
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <Link to="/scanner">
              <Nav.Item
                onClick={() => {
                  setOpen(false);
                }}
                eventKey="/"
              >
                <AiOutlineScan className="mr-4 mt-n1" />
                Scanner
              </Nav.Item>
            </Link>
          ) : (
            <Link to="/">
              <Nav.Item
                onClick={() => {
                  setOpen(false);
                }}
                eventKey="/"
              >
                <AiOutlineUser className="mr-4 mt-n1" />
                Login
              </Nav.Item>
            </Link>
          )}
        </Nav>
        <Nav>
          <Link to="/contact">
            <Nav.Item
              onClick={() => {
                setOpen(false);
              }}
              eventKey="/"
              icon="home"
              a
            >
              <AiFillInfoCircle className="mr-4 mt-n1" />
              Contact Support
            </Nav.Item>
          </Link>
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <Link to="/logout">
              <Nav.Item
                onClick={() => {
                  sessionStorage.clear();
                  props.dispatch(Action.handleIsUserAuthenticated(false));
                  props.history.push("/");
                  props.history.go();
                }}
                eventKey="/"
                icon="home"
              >
                <AiOutlineLogout className="mr-4 mt-n1" />
                Logout
              </Nav.Item>
            </Link>
          ) : null}
        </Nav>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="menu" onClick={() => setOpen(true)}>
          &#9776;
        </div>
        <div style={{ fontSize: "30px", cursor: "pointer" }}>
          {" "}
          <img src={Logo} className="logo" />
        </div>
        <div></div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(Header));
