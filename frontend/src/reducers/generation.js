import {GENERATION_ACTION_TYPE} from '../action/types';
import fetchStates from './fetchStates';

const DEFAULT_GENERATION = {

    generationId: '',
    expiration: '',
    message: ''
}

const generationReducer = (state = DEFAULT_GENERATION, action) => {
    switch (action.type) {
        case GENERATION_ACTION_TYPE.FETCH_STARTED:
            return {
                ...state,
                status: fetchStates.fetching
            };
        case GENERATION_ACTION_TYPE.FETCH_SUCCEEDED:
            return {
                ...state,
                ...action.generation,
                status: fetchStates.success
            };
        case GENERATION_ACTION_TYPE.FETCH_FAILED:
            return {
                ...state,
                message: action.message,
                status: fetchStates.error
            };
        default:
            return state;
            // } if (action.type === GENERATION_ACTION_TYPE) {     return {generation:
            // action.generation}; } return {generation: DEFAULT_GENERATION}
    }
}

export default generationReducer;