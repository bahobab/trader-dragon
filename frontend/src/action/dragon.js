import { DRAGON_ACTION_TYPE, GENERATION_ACTION_TYPE } from "./types";
import { BACKEND } from "../config";

export const fetchDragonStart = () => ({
  type: DRAGON_ACTION_TYPE.FETCH_STARTED
});

// export const fetchDragon = () => async dispatch => { console.log('KERE!!!!')
// fetchDragonStart(); try { const res = await
// fetch(`http://localhost:3003/dragon/new`); console.log('Fetch dragon', res);
// const json = await res.json(); dispatch({type:
// DRAGON_ACTION_TYPE.FETCH_SUCCEEDED, dragon: json.dragon}); } catch (error) {
// dispatch({type: DRAGON_ACTION_TYPE.FETCH_FAILED, message: error.message}) }
// };

export const fetchDragon = () => dispatch => {
  fetchDragonStart();

  return fetch(`${BACKEND.ADDRESS}/dragon/new`, { credentials: "include" })
    .then(response => response.json())
    .then(json => {
      if (json.type === "error") {
        return dispatch({
          type: GENERATION_ACTION_TYPE.FETCH_FAILED,
          message: json.message
        });
      }
      return dispatch({
        type: DRAGON_ACTION_TYPE.FETCH_SUCCEEDED,
        dragon: json.dragon
      });
    })
    .catch(error =>
      dispatch({
        type: DRAGON_ACTION_TYPE.FETCH_FAILED,
        message: error.message
      })
    );
};
