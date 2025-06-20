import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:{},
    userInfo:{},
    menu:[]
}

const dataSlicePersisted = createSlice({
    name: "dataSlicePersisted",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setMenu: (state, action) => {
            state.menu = action.payload;
        },
    },
});

export const { setToken, setUserInfo, setMenu } = dataSlicePersisted.actions;
export default dataSlicePersisted.reducer;