import {GENERATION_ACTION_TYPE} from './types';
import {BACKEND} from '../config';

const fetchGenerationStart = () => ({type: GENERATION_ACTION_TYPE.FETCH_STARTED});

export const fetchGeneration = () => dispatch => {
    fetchGenerationStart();

    return fetch(`${BACKEND.ADDRESS}/generation`)
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                return dispatch({type: GENERATION_ACTION_TYPE.FETCH_FAILED, message: json.message});
            }
            return dispatch({type: GENERATION_ACTION_TYPE.FETCH_SUCCEEDED, generation: json.generation})
        })
        .catch(error => dispatch({type: GENERATION_ACTION_TYPE.FETCH_FAILED, message: error.message}));
}
