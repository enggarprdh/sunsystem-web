import { combineReducers } from "@reduxjs/toolkit";
import  userReducer  from "./user.reducer";

export default combineReducers({
    user: userReducer,
    // Add other reducers here
});