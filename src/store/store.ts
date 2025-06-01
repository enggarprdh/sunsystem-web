import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';

// const store = configureStore({
//     reducer: {
//     // Add your reducers here
//     user:userReducer
//     },
// });


    const store = configureStore({
        reducer: {
            user: userReducer,
            // Add other reducers here
        },
    });


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;