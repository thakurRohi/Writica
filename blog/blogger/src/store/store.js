import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import fileSlice from './fileSlice';
import profileSlice from './profileSlice'
import likesSlice from'./BackendConfig/likesSlice'
import commentsSlice from './BackendConfig/commentsSlice'
import bookmarkSlice from './BackendConfig/bookmarkSlice'
import userProfileSlice from './userProfileSlice'
const store = configureStore({
    reducer: {
        auth : authSlice,
        file: fileSlice,
        profile: profileSlice,
        userProfile:userProfileSlice,
        likes:likesSlice,
        comments:commentsSlice,
        bookmarks:bookmarkSlice
        //TODO: add more slices here for posts
    }
});


export default store;