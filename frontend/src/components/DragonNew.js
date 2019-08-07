import React from "react";
import { connect } from "react-redux";

import { Button } from "react-bootstrap";

import DragonAvatar from "./DragonAvatar";
import { fetchDragon } from "../action/dragon";
import fetchStates from "../reducers/fetchStates";

fetchDragon();

const DEFAUT_DRAGON = {
  dragonId: null,
  generationId: null,
  nickname: "undefined",
  birthdate: null,
  traits: []
};

class DragonNew extends React.Component {
  // componentDidMount() {     this         .props         .fetchDragon(); }
  // getNewDragon = () => {     fetch('http://localhost:3003/dragon/new')
  // .then(response => response.json())         .then(json =>
  // this.setState({dragon: json.dragon}))         .catch(error =>
  // console.error(error)); }

  render() {
    const { dragon, fetchDragon } = this.props;

    return (
      <div>
        <Button onClick={fetchDragon}>Get New Dragon</Button>

        <DragonAvatar dragon={dragon} />
      </div>
    );
  }
}

export default connect(
  ({ dragon }) => ({ dragon }),
  { fetchDragon }
)(DragonNew);

/************************** equivalent ************************/

// const mapDispatchToProps = dispatch => ({     fetchDragon: () =>
// dispatch(fetchDragon()) }); const mapStateToProps = ({dragon}) => ({dragon});
// export default connect(mapStateToProps, mapDispatchToProps)(DragonNew);
