

import { configureStore } from '@reduxjs/toolkit';
import { allUserReducer, postofFollowingReducer, userProfileReducer, userReducer } from './Reducers/User';
import { likeReducer, mypostsReducer, userPostsReducer } from './Reducers/Post';

const store=configureStore({
    reducer:{
        user:userReducer,
        postofFollowing:postofFollowingReducer,
        allUsers:allUserReducer,
        like:likeReducer,
        myPosts:mypostsReducer,
        userProfile:userProfileReducer,
        userPosts:userPostsReducer,
    },

 
});

export default store ;