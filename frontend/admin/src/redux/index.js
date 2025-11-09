import {combineReducers} from '@reduxjs/toolkit';
import auth from'./slices/auth.slice.js';
import userPoints from './slices/userPoints.slice.js'

const rootReducer=combineReducers({
    auth,
    userPoints
});

export default rootReducer;