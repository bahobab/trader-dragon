import { ACCOUNT_DRAGONS_ACTION_TYPE } from "./types";

import { fetchFromAccount } from "./account";

export const fetchAccountDragons = () =>
  fetchFromAccount({
    endpoint: "dragons",
    options: { credentials: "include" },
    FETCH_TYPE: ACCOUNT_DRAGONS_ACTION_TYPE.FETCH_STARTED,
    FAILURE_TYPE: ACCOUNT_DRAGONS_ACTION_TYPE.FETCH_FAILED,
    SUCCESS_TYPE: ACCOUNT_DRAGONS_ACTION_TYPE.FETCH_SUCCEEDED
  });
