import {combineReducers} from '@reduxjs/toolkit';
import auth from'./slices/auth.slice.js';

const rootReducer=combineReducers({
    auth
});

export default rootReducer;