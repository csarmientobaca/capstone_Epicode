import { combineReducers } from 'redux';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actions';

// Initial state
const initialState = {
    token: null,
    error: null,
};

// Reducer for login
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                token: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

// Root reducer
const rootReducer = combineReducers({
    login: loginReducer,
});

export default rootReducer;
