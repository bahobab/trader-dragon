import { fetchFromAccount } from "./account";
import { AccOUNT_INFO_TYPE } from "../action/types";

export const fetchAccountInfo = () =>
  fetchFromAccount({
    endpoint: "info",
    options: { credentials: "include" },
    FETCH_TYPE: AccOUNT_INFO_TYPE.FETCH_STARTED,
    FAILURE_TYPE: AccOUNT_INFO_TYPE.FETCH_FAILED,
    SUCCESS_TYPE: AccOUNT_INFO_TYPE.FETCH_SUCCEEDED
  });
