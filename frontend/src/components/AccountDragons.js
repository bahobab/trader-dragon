import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAccountDragons } from "../action/accountDragons";
import AccountDragonRow from "./AccountDragonRow";

class AccountDragons extends React.Component {
  componentDidMount() {
    this.props.fetchAccountDragons();
  }
  render() {
    // if (!this.props.accountDragons) return <div />;
    const renderDragons = this.props.accountDragons.dragons.map(dragon => (
      <div key={dragon.dragonId}>
        <AccountDragonRow dragon={dragon} />
        <hr />
      </div>
    ));

    return (
      <div>
        <Link to="/" className="signout-button">
          Home
        </Link>
        <h2>Account Dragons</h2>
        {renderDragons}
      </div>
    );
  }
}

export default connect(
  ({ accountDragons }) => ({ accountDragons }),
  { fetchAccountDragons }
)(AccountDragons);
