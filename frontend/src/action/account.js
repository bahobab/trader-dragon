import { ACCOUNT_ACTION_TYPE } from "./types";
import { BACKEND } from "../config";

export const fetchFromAccount = ({
  endpoint,
  options,
  FETCH_TYPE,
  FAILURE_TYPE,
  SUCCESS_TYPE
}) => dispatch => {
  dispatch({ type: FETCH_TYPE });

  return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)
    .then(response => response.json())
    .then(json => {
      if (json.type === "error") {
        return dispatch({
          type: FAILURE_TYPE,
          message: json.message
        });
      } else {
        return dispatch({
          type: SUCCESS_TYPE,
          ...json
        });
      }
    })
    .catch(error =>
      dispatch({
        type: FAILURE_TYPE,
        message: error.message
      })
    );
};
export const signup = ({ username, password }) =>
  fetchFromAccount({
    endpoint: "signup",
    options: {
      method: "POST",
      body: JSON.stringify({ username, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    },
    FETCH_TYPE: ACCOUNT_ACTION_TYPE.FETCH_STARTED,
    FAILURE_TYPE: ACCOUNT_ACTION_TYPE.FETCH_FAILED,
    SUCCESS_TYPE: ACCOUNT_ACTION_TYPE.SIGNUP_FETCH_SUCCEEDED
  });

export const signin = ({ username, password }) =>
  fetchFromAccount({
    endpoint: "signin",
    options: {
      method: "POST",
      body: JSON.stringify({ username, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    },
    FETCH_TYPE: ACCOUNT_ACTION_TYPE.FETCH_STARTED,
    FAILURE_TYPE: ACCOUNT_ACTION_TYPE.FETCH_FAILED,
    SUCCESS_TYPE: ACCOUNT_ACTION_TYPE.LOGIN_FETCH_SUCCEEDED
  });

export const signout = () =>
  fetchFromAccount({
    endpoint: "signout",
    options: {
      credentials: "include"
    },
    FETCH_TYPE: ACCOUNT_ACTION_TYPE.FETCH_STARTED,
    FAILURE_TYPE: ACCOUNT_ACTION_TYPE.FETCH_FAILED,
    SUCCESS_TYPE: ACCOUNT_ACTION_TYPE.LOGOUT_FETCH_SUCCEEDED
  });

export const fetchAuthenticated = () =>
  fetchFromAccount({
    endpoint: "authenticated",
    options: { credentials: "include" },
    FETCH_TYPE: ACCOUNT_ACTION_TYPE.FETCH_STARTED,
    FAILURE_TYPE: ACCOUNT_ACTION_TYPE.FETCH_FAILED,
    SUCCESS_TYPE: ACCOUNT_ACTION_TYPE.AUTHENTICATED_FETCH_SUCCEEDED
  });

// export const signup = ({username, password}) => dispatch => { dispatch({type:
// ACCOUNT_ACTION_TYPE.FETCH_STARTED})     return
// fetch(`${BACKEND.ADDRESS}/account/signup`, {         method: 'POST', headers:
// {             'Content-Type': 'application/json'         }, body:
// JSON.stringify({username, password}),             credentials: 'include' })
//   .then(response => response.json()) .then(json => { console.log(">>json",
// json);             if (json.type === 'error') { return dispatch({type:
// ACCOUNT_ACTION_TYPE.FETCH_FAILED, message: json.message});          } else {
//               return dispatch({       type:
// ACCOUNT_ACTION_TYPE.FETCH_SUCCEEDED, ...json    })             }        })
// .catch(error => dispatch({type: ACCOUNT_ACTION_TYPE.FETCH_FAILED, message:
// error.message})) } export const signout = () => dispatch => { dispatch({type:
// ACCOUNT_ACTION_TYPE.FETCH_STARTED});     return
// fetch(`${BACKEND.ADDRESS}/account/signout`, {credentials: 'include'})
// .then(response => response.json())         .then(json => {             if
// (json.type = 'error') {                 dispatch({type:
// ACCOUNT_ACTION_TYPE.FETCH_FAILED, message: json.message});             } else
// {                 dispatch({                     type:
// ACCOUNT_ACTION_TYPE.LOGOUT_SUCCESS,                     ...json   })    } })
//       .catch(error => dispatch({type: ACCOUNT_ACTION_TYPE.FETCH_FAILED,
// message: error.message})); }
