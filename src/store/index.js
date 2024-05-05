import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import {
    persistStore, 
    persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";

const persistConfig = {
    key: 'user',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)


export default () => {
    let store = configureStore({
        reducer: {
            user: persistedReducer,
        },
        middleware: [thunk]
    })
    let persistor = persistStore(store)
    return { store, persistor }
}