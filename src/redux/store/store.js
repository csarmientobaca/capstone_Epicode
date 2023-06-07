import { configureStore } from '@reduxjs/toolkit'; // Make sure to use '@reduxjs/toolkit' package
import rootReducer from '../reducers/reducers';

const store = configureStore({
    reducer: rootReducer,
});

export default store;