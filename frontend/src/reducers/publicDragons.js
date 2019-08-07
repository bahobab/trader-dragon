import { PUBLIC_DRAGONS_ACTION_TYPE } from "../action/types";
import fetchStates from "./fetchStates";

const DEFAULT_PUBLIC_DRAGONS = {
  dragons: []
};

const publicDragons = (state = DEFAULT_PUBLIC_DRAGONS, action) => {
  switch (action.type) {
    case PUBLIC_DRAGONS_ACTION_TYPE.FETCH_STARTED:
      return {
        ...state,
        status: fetchStates.fetching
      };
    case PUBLIC_DRAGONS_ACTION_TYPE.FETCH_SUCCEEDED:
      return {
        ...state,
        status: fetchStates.success,
        dragons: action.dragons
      };
    case PUBLIC_DRAGONS_ACTION_TYPE.FETCH_FAILED:
      return {
        ...state,
        status: fetchStates.error,
        message: action.message
      };
    default:
      return state;
  }
};

export default publicDragons;
