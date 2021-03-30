import React from "react";
import { Nav } from "react-bootstrap";
import {
  AiFillInfoCircle,
  AiOutlineScan,
  AiFillHome,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import Logo from "assets/images/Logo.svg";
import Icon from "assets/images/favicon.ico";
// Redux
import { connect } from "react-redux";
// Router
import { withRouter, Link } from "react-router-dom";
import * as Action from "_actions";
import VersioningMenu from "components/VersioningMenu";

const Header = (props) => {
  const [open, setOpen] = React.useState(false);

  const { isAuthenticated } = props?.auth;

  return (
    <>
      <div id="mySidenav" className={open ? "sidenav w-90" : "sidenav"}>
        <span className="closebtn" onClick={() => setOpen(false)}>
          &times;
        </span>
        <Link to="/">
          <img src={Logo} alt="logo" height="35px" width="auto" />
        </Link>
        <Nav>
          <Link
            to={
              !isAuthenticated
                ? "/"
                : sessionStorage.getItem("role") !== "WAITER"
                ? "/scanner"
                : {
                    pathname: "/outlet",
                    search: `outlet_venue=${props?.outlet?.outlet?.id}`,
                  }
            }
          >
            <Nav.Item
              onClick={() => {
                setOpen(false);
              }}
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
              >
                <AiOutlineUser className="mr-4 mt-n1" />
                Login
              </Nav.Item>
            </Link>
          )}
        </Nav>
        <Nav>
          <a target="_blank" href="https://wa.me/message/HGRXRF5QIYCWH1">
            <Nav.Item
              onClick={() => {
                setOpen(false);
              }}
            >
              <AiFillInfoCircle className="mr-4 mt-n1" />
              Contact Support
            </Nav.Item>
          </a>
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
              >
                <AiOutlineLogout className="mr-4 mt-n1" />
                Logout
              </Nav.Item>
            </Link>
          ) : null}
        </Nav>
        {/* <VersioningMenu /> */}
      </div>
      <div
        className={
          "d-flex align-items-center justify-content-between " +
          (props?.location?.pathname === "/outlet" ? "ht-35" : "header-style")
        }
      >
        <div className="menu" onClick={() => setOpen(true)}>
          &#9776;
        </div>
        <div>
          {props?.location?.pathname === "/outlet" ? (
            <a className="color-link" href="https://tomati.app/">
              <small className="fs-11">Powered by &nbsp;</small>
              <img
                src={Icon}
                alt="icon"
                className="d-inline-block align-top mt-1"
                height="17px"
                width="auto"
              />
              Tomati.app
            </a>
          ) : (
            <img src={Logo} alt="logo" height="30px" width="auto" />
          )}
        </div>

        <div />
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return { auth: state.auth, outlet: state.outlet };
}

export default withRouter(connect(mapStateToProps)(Header));
