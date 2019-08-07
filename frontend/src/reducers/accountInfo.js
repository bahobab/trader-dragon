import { fetchFromAccount } from "../action/account";
import fetchStates from "./fetchStates";
import { AccOUNT_INFO_TYPE } from "../action/types";

const accountIfo = (state = {}, action) => {
  switch (action.type) {
    case AccOUNT_INFO_TYPE.FETCH_STARTED:
      return {
        ...state,
        status: fetchStates.fetching
      };
    case AccOUNT_INFO_TYPE.FETCH_SUCCEEDED:
      return {
        ...state,
        status: fetchStates.success,
        ...action.info
      };
    case AccOUNT_INFO_TYPE.FETCH_FAILED:
      return {
        ...state,
        status: fetchStates.error,
        message: action.message
      };
    default:
      return state;
  }
};

export default accountIfo;
