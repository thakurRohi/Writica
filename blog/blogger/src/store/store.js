import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import fileSlice from './fileSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        file: fileSlice,
        //TODO: add more slices here for posts
    }
});


export default store;