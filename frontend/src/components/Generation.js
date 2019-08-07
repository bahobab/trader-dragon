import React from "react";
import { connect } from "react-redux";

import { fetchGeneration } from "../action/generation";
import fetchStates from "../reducers/fetchStates";

const MINIMUM_DELAY = 3000;

class Generation extends React.Component {
  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchNextGeneration() {
    this.props.fetchGeneration();

    let delay =
      new Date(this.props.generation.expiration).getTime() -
      new Date().getTime();

    if (delay < MINIMUM_DELAY) {
      delay = MINIMUM_DELAY;
    }

    this.timer = setTimeout(() => {
      this.fetchNextGeneration();
    }, delay);
  }

  render() {
    const { generationId, expiration, status, message } = this.props.generation;

    if (status === fetchStates.fetching) {
      return <div>...</div>;
    }

    if (status === fetchStates.error) {
      return <div>{message}</div>;
    }

    return (
      <div>
        <h3>Generation: {generationId}. Expires on:</h3>
        <h4>{new Date(expiration).toString()}</h4>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({     fetchGeneration: () =>
// fetchGeneration(dispatch) });

const mapStateToProps = state => {
  const generation = state.generation;
  return { generation };
};

const componentConnector = connect(
  mapStateToProps,
  { fetchGeneration }
);
export default componentConnector(Generation);
