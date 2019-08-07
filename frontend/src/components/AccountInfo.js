import React from "react";
import { connect } from "react-redux";

import { fetchAccountInfo } from "../action/accountInfo";

class AccountInfo extends React.Component {
  componentDidMount() {
    this.props.fetchAccountInfo();
  }
  render() {
    const { username, balance } = this.props.accountInfo;
    return (
      <div>
        <h3>Account Info</h3>
        <div>User name: {username}</div>
        <div>Balance: {balance}</div>
      </div>
    );
  }
}

export default connect(
  ({ accountInfo }) => ({ accountInfo }),
  { fetchAccountInfo }
)(AccountInfo);
