import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchPublicDragons } from "../action/publicDragons";
import { fetchAccountDragons } from "../action/accountDragons";

import PublicDragonRow from "./PublicDragonRow";

class PublicDragons extends React.Component {
  componentDidMount() {
    this.props.fetchPublicDragons();
    this.props.fetchAccountDragons();
  }

  render() {
    const renderDragons = this.props.publicDragons.dragons.map(dragon => {
      return (
        <div key={dragon.dragonId}>
          <PublicDragonRow dragon={dragon} />
          <hr />
        </div>
      );
    });
    return (
      <div>
        <Link to="/" className="signout-button">
          Home
        </Link>
        <h3>Public Dragons</h3>
        {renderDragons}
      </div>
    );
  }
}

export default connect(
  publicDragons => publicDragons,
  { fetchPublicDragons, fetchAccountDragons }
)(PublicDragons);
