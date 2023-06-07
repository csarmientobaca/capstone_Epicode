import axios from 'axios';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const SET_USER = 'SET_USER';

// Action creators
export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const fetchUserDataSuccess = (userData) => ({
    type: FETCH_USER_DATA_SUCCESS,
    payload: userData,
});

export const fetchUserDataFailure = (error) => ({
    type: FETCH_USER_DATA_FAILURE,
    payload: error,
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

// Async action creator
export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/login', {
            email,
            password,
        });
        const token = response.data.user.access;
        sessionStorage.setItem('token', token);
        dispatch(loginSuccess(token));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const fetchUserData = (token) => async (dispatch) => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/api/v1/user/data', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const userData = response.data;
        dispatch(fetchUserDataSuccess(userData));
    } catch (error) {
        dispatch(fetchUserDataFailure(error.message));
    }
};