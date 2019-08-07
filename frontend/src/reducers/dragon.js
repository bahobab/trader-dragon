import { DRAGON_ACTION_TYPE } from "../action/types";
import fetchStates from "../reducers/fetchStates";

const DEFAULT_STATTE = {
  dragonId: "",
  generationId: "",
  nickname: "undefined",
  birthdate: "",
  traits: []
};

const dragonReducer = (state = DEFAULT_STATTE, action) => {
  switch (action.type) {
    case DRAGON_ACTION_TYPE.FETCH_STARTED:
      return {
        ...state,
        status: fetchStates.fetching
      };
    case DRAGON_ACTION_TYPE.FETCH_SUCCEEDED:
      return {
        ...state,
        status: fetchStates.success,
        ...action.dragon
      };
    case DRAGON_ACTION_TYPE.FETCH_FAILED:
      return {
        ...state,
        status: fetchStates.error,
        message: action.message
      };
    default:
      return state;
  }
};

export default dragonReducer;
