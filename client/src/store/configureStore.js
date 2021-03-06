import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducer';


export default function configureStoreFunc() {
    return configureStore({
        reducer: rootReducer,
        middleware: [...getDefaultMiddleware()]
    });
}