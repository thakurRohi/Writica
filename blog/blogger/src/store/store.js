import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import fileSlice from './fileSlice';
import testSlice from './testSlice'

const store = configureStore({
    reducer: {
        auth : authSlice,
        file: fileSlice,
        meals:testSlice
        //TODO: add more slices here for posts
    }
});


export default store;