import React from "react";
import { Form, InputGroup } from "react-bootstrap";
// Redux
import { connect } from "react-redux";
import * as Action from "_actions/auth";
// Router
import { withRouter, Link } from "react-router-dom";
import Mail from "assets/images/Mail.svg";
import Lock from "assets/images/Lock.svg";
import AlertMessage from "components/AlertMessage";

const Login = (props) => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    userLoginResponse: {},
    hidden: true,
  });

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    props.dispatch(Action.handleLoginError(null));
    setValues((values) => ({ ...values, [name]: value }));
  };

  function handlePasswordToggle(event) {
    event.preventDefault();
    setValues({ ...values, hidden: !values.hidden });
  }

  async function handleLoginData(event) {
    event.preventDefault();
    // Creating post Data
    var postData = {
      email: values.email,
      password: values.password,
    };
    await props.dispatch(Action.userLogin(postData));
  }
  return (
    <div>
      <div className="login-style d-flex justify-content-center align-items-center">
        <div className=" w-75 d-flex flex-column justify-content-center align-items-center">
          <Form onSubmit={handleLoginData} autoComplete="off">
            <AlertMessage
              variant="danger"
              error={
                props.auth.loginError && {
                  message: props.auth.loginError,
                }
              }
              onDismiss={() => props.dispatch(Action.handleLoginError(null))}
            />
            <Form.Group className="w-100">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="bg-white border-right-0">
                    <img
                      src={Mail}
                      alt="mail"
                      className="img-fluid"
                      width="20"
                      height="20"
                    />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  className="border-left-0"
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  placeholder="Enter email"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="bg-white border-right-0">
                    <img
                      src={Lock}
                      alt="lock"
                      className="img-fluid"
                      width="20"
                      height="20"
                    />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  className="border-left-0 border-right-none"
                  name="password"
                  value={values.password}
                  onChange={handleChange("password")}
                  placeholder="Password"
                  type={values.hidden ? "password" : "text"}
                  required
                />
                <div className="input-group-append">
                  <div className="show-button" onClick={handlePasswordToggle}>
                    <small>{values.hidden ? "Show" : "Hide"}</small>
                  </div>
                </div>
              </InputGroup>
            </Form.Group>
            <Form.Group className="w-100">
              <button className="btn btn-blue w-100" type="submit">
                Login
              </button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(Login));
