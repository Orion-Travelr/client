import { createStore } from 'redux'

export const SYSTEM_LOADING = 'SYSTEM_IS_LOADING';
export const SYSTEM_LOADED = 'SYSTEM_IS_LOADED';

interface SpinnerState {
    type: typeof SYSTEM_LOADING
    loading: boolean
}

interface SpinnerAction {
    type: typeof SYSTEM_LOADING
    payload: boolean
}

export function setLoading() {
    return {type: SYSTEM_LOADING }
}

export function stopLoading() {
    return {type: SYSTEM_LOADED }
}

const initialState = {
    loading: true
};

function reducers(state = initialState, action) {
    switch (action.type) {
        case SYSTEM_LOADING:
            return Object.assign({}, state, {loading: true});
        case SYSTEM_LOADED:
            return Object.assign({}, state, {loading: false});
        default:
            return state
    }
}

export const store = createStore(reducers, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
