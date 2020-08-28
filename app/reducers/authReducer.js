
import Immutable from 'seamless-immutable';

const defaultState = Immutable.flatMap({});

export default function (state = defaultState) {
    return state;
}