import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import fileSlice from './fileSlice';
import profileSlice from './profileSlice'
import likesSlice from'./BackendConfig/likesSlice'
import commentsSlice from './BackendConfig/commentsSlice'
import bookmarkSlice from './BackendConfig/bookmarkSlice'
const store = configureStore({
    reducer: {
        auth : authSlice,
        file: fileSlice,
        profile: profileSlice,
        likes:likesSlice,
        comments:commentsSlice,
        bookmarks:bookmarkSlice
        //TODO: add more slices here for posts
    }
});


export default store;