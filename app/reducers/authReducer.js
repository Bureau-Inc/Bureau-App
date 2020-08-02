
import Immutable from 'seamless-immutable';
import { DISCOVER_REQUEST, DISCOVER_SUCCESS, DISCOVER_FAILURE } from '../actions/types';

const defaultState = Immutable.flatMap({
    isLoginProcessing: false
});

export default function (state = defaultState, action) {
    switch(action.type) {
    case DISCOVER_REQUEST:
        return Immutable.merge(state, { isLoginProcessing: true });
    case DISCOVER_SUCCESS:
        return Immutable.merge(state, {isLoginProcessing: false });
    case DISCOVER_FAILURE:
        return Immutable.merge(state, {isLoginProcessing: false });
    default:
        return state;
    }
}