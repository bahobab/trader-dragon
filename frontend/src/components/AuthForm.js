import React from "react";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl, Alert } from "react-bootstrap";

import { signup, signin } from "../action/account";
import fetchStates from "../reducers/fetchStates";

class AuthForm extends React.Component {
  state = {
    username: "",
    password: "",
    hasError: false
  };

  updateInput = (event, inputField) => {
    const inputFieldValue = event.target.value;
    this.setState({ [inputField]: inputFieldValue });
  };

  updatePassword = event => {
    const password = event.target.value;
    this.setState({ password });
  };

  signup = e => {
    const { signup, status } = this.props;
    const { username, password } = this.state;
    signup({ username, password });
    // if (status === fetchStates.error) {     this.setState({hasError: true}) }
  };

  signin = e => {
    const { username, password } = this.state;
    const { signin } = this.props;

    signin({ username, password });
  };

  get Error() {
    const { status, message, signedIn } = this.props.account;
    if (status === fetchStates.error) {
      return (
        <div color="warning" hidden={!(status === "error")}>
          {message}
        </div>
      );
    }
  }

  render() {
    const { hasError } = this.state;
    const { status, message, signedIn } = this.props.account;
    // const errorMessage = status === fetchStates.error     ? message     : ''

    return (
      <div>
        <h2>Dragon Pop</h2>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="username"
            onChange={e => this.updateInput(e, "username")}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={e => this.updateInput(e, "password")}
            placeholder="password"
          />
        </FormGroup>
        <div>
          <Button onClick={this.signin}>Log In</Button>
          <span>or</span>
          <Button onClick={this.signup}>Sign Up</Button>
          <div>{this.Error}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ account: state.account });

export default connect(
  mapStateToProps,
  { signup, signin }
)(AuthForm);
