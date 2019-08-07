import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import { BACKEND } from "../config";
import history from "../history";

class MattingOptions extends React.Component {
  mate = ({ matronDragonId, patronDragonId }) => () => {
    fetch(`${BACKEND.ADDRESS}/dragon/mate`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ matronDragonId, patronDragonId }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(json => {
        alert(json.message);
        if (json.type !== error) history.push("/account-dragons");
      })
      .catch(error => alert(error.message));
  };

  render() {
    return (
      <div>
        <h4>Pick one of your dragons to mate with:</h4>
        {this.props.accountDragons.dragons.map(dragon => {
          const { dragonId, generationId, nickname } = dragon;

          return (
            <span key={dragonId}>
              <Button
                onClick={this.mate({
                  matronDragonId: dragonId,
                  patronDragonId: this.props.patronDragonId
                })}
              >
                G{generationId}.I{dragonId}. {nickname}
              </Button>{" "}
            </span>
          );
        })}
      </div>
    );
  }
}

export default connect(({ accountDragons }) => ({ accountDragons }))(
  MattingOptions
);
