import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { onLogin, onSignup } from "../store/actions/userActions";
import { TextField } from "@material-ui/core";
import { Header } from "../cmps/Header";
import { NavLink } from "react-router-dom";

class _LoginSignup extends Component {
  state = {
    userInfo: {
      fullname: "",
      username: "",
      password: "",
    },
    credentials: {
      username: "",
      password: "",
    },
    pageMode: null,
  };

  componentDidMount() {
    const { loggedinUser } = this.props;
    if (loggedinUser) this.props.history.push("/");
    const pageMode =
      this.props.location.pathname === "/login" ? "login" : "signup";
    this.setState({ pageMode });
  }

  componentDidUpdate() {
    const { loggedInUser } = this.props;
    if (loggedInUser) this.props.history.goBack();
  }

  validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length < 6) {
      errors.username = "Please use at least 6 characters";
    }
    if (values.password.length < 6) {
      errors.password = "Password too short";
    }
    if (!values.fullname) {
      errors.fullname = "Required";
    } else if (values.fullname.length < 6) {
      errors.fullname = "Please use at least 6 characters";
    }
    return errors;
  };

  onSubmit = (values) => {
    const { pageMode } = this.state;
    const { onLogin, onSignup } = this.props;
    pageMode === "login" ? onLogin(values) : onSignup(values);
  };

  styledField = (props) => {
    return <TextField {...props} variant="outlined" color={"primary"} />;
  };

  setSignUp = (path) => {
    let pageMode = path;
    this.setState({ pageMode });
  };

  render() {
    const { pageMode, credentials, userInfo } = this.state;
    const { loginErr } = this.props;
    if (!pageMode) return "";
    return (
      <div className="login-page flex column">
        <Header />
        <section className="content flex column align-center justify-center">
          {pageMode === "login" && (
            <section className=" login flex column align-center ">
              <h2>Login</h2>
              <Formik initialValues={credentials} onSubmit={this.onSubmit}>
                <Form className="flex column align-center">
                  <Field
                    type="username"
                    label="Username"
                    name="username"
                    as={this.styledField}
                  />
                  <ErrorMessage name="username" component="div" />
                  <Field
                    type="password"
                    label="Password"
                    name="password"
                    as={this.styledField}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    as={this.styledField}
                  />
                  {loginErr && <p>{loginErr}</p>}
                  <button type="submit" className="primary-btn">
                    Login
                  </button>
                </Form>
              </Formik>
              <NavLink to="/signup">
                <p
                  className="log-sign-btn"
                  onClick={(ev) => this.setSignUp("signup")}
                >
                  Sign-up
                </p>
              </NavLink>
            </section>
          )}
          {pageMode === "signup" && (
            <section className=" signup flex column align-center ">
              <h2>Sign-up</h2>
              <Formik
                initialValues={userInfo}
                validateOnChange={false}
                validateOnBlur={false}
                validate={this.validate}
                onSubmit={this.onSubmit}
              >
                <Form className="flex column align-center">
                  <Field
                    type="fullname"
                    label="Fullname"
                    name="fullname"
                    as={this.styledField}
                  />
                  <ErrorMessage name="fullname" component="p" />
                  <Field
                    type="username"
                    label="Username"
                    name="username"
                    as={this.styledField}
                  />
                  <ErrorMessage name="username" component="p" />
                  <Field
                    type="password"
                    label="Password"
                    name="password"
                    as={this.styledField}
                  />
                  <ErrorMessage name="password" component="p" />
                  <button type="submit" className="primary-btn">
                    Sign-up
                  </button>
                </Form>
              </Formik>
              <NavLink to="/login">
                <p
                  className="log-sign-btn"
                  onClick={(ev) => this.setSignUp("login")}
                >
                  Login
                </p>
              </NavLink>
            </section>
          )}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.userModule.loggedInUser,
    loginErr: state.userModule.loginErr,
  };
}

const mapDispatchToProps = {
  onLogin,
  onSignup,
};

export const LoginSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginSignup);
