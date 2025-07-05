import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import fileSlice from './fileSlice';
// import profileSlice from './profileSlice'

const store = configureStore({
    reducer: {
        auth : authSlice,
        file: fileSlice,
        // profile: profileSlice
        //TODO: add more slices here for posts
    }
});


export default store;