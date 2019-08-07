import { ACCOUNT_DRAGONS_ACTION_TYPE } from "../action/types";
import fetchStates from "../reducers/fetchStates";

const ACCOUNTDRAGONS_DEFAULT = {
  dragons: []
};

const accountDragons = (state = ACCOUNTDRAGONS_DEFAULT, action) => {
  switch (action.type) {
    case ACCOUNT_DRAGONS_ACTION_TYPE.FETCH_STARTED:
      return {
        ...state,
        status: fetchStates.fetching
      };
    case ACCOUNT_DRAGONS_ACTION_TYPE.FETCH_SUCCEEDED:
      return {
        ...state,
        dragons: action.dragons,
        message: action.message,
        status: fetchStates.success
      };
    case ACCOUNT_DRAGONS_ACTION_TYPE.FETCH_FAILED:
      return {
        ...state,
        message: action.message,
        status: fetchStates.error
      };

    default:
      return state;
  }
};

export default accountDragons;
