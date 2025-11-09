import {combineReducers} from '@reduxjs/toolkit';
import auth from'./slices/auth.slice.js';
import userPoints from './slices/userPoints.slice.js'
import redeemItems from './slices/redeemItems.slice.js';

const rootReducer=combineReducers({
    auth,
    userPoints,
    redeemItems
});

export default rootReducer;