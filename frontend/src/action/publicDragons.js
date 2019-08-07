import { PUBLIC_DRAGONS_ACTION_TYPE } from "../action/types";
import { BACKEND } from "../config";

export const fetchPublicDragons = () => dispatch => {
  dispatch({ type: PUBLIC_DRAGONS_ACTION_TYPE.FETCH_STARTED });

  return fetch(`${BACKEND.ADDRESS}/dragon/public-dragons`)
    .then(response => response.json())
    .then(json => {
      if (json.type === "error")
        return dispatch({
          type: PUBLIC_DRAGONS_ACTION_TYPE.FETCH_FAILED,
          message: json.message
        });
      return dispatch({
        type: PUBLIC_DRAGONS_ACTION_TYPE.FETCH_SUCCEEDED,
        dragons: json.dragons
      });
    })
    .catch(error =>
      dispatch({
        type: PUBLIC_DRAGONS_ACTION_TYPE.FETCH_FAILED,
        message: error.message
      })
    );
};
