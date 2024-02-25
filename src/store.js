import {configureStore,combineReducers} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
const persistConfig={
    key:'root',
    version:1,
    storage
}

const reducer=combineReducers({
    users:userReducer
})

const newpersistReducer=persistReducer(persistConfig,reducer);
export const store=configureStore({
    reducer:newpersistReducer
})
