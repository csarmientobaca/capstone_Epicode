import axios from 'axios';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action creators
export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

// Async action creator
export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/v1/cesar/login', {
            email,
            password,
        });

        const token = response.data.cesar.access;

        if (token) {
            sessionStorage.setItem('token', token);
            dispatch(loginSuccess(token));
        } else {
            throw new Error('Invalid response format: Missing token');
        }
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};
