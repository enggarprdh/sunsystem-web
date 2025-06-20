import { combineReducers } from "@reduxjs/toolkit";
import dataSlicePersisted from "./dataSlicePersisted";


const rootReducer = combineReducers({
    dataSlicePersisted,
});

export default rootReducer;