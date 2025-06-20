import { configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";



const persistConfig = {
    key:"root",
    storage,
    whitelist: ["dataSlicePersisted"], // Specify which slices to persist    
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE','persist/REGISTER'],
            }
        }),
});

const persistor = persistStore(store);
export { store, persistor };
