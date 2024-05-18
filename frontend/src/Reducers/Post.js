import { createReducer } from "@reduxjs/toolkit";

const initialState={}

export const likeReducer = createReducer(initialState, (builder) => {
    builder
      .addCase('likeRequest', (state) => {
        state.loading = true;
      })
      .addCase('likeSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
       
      })
      .addCase('likeFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
       
      })
      
      .addCase('addcommentRequest', (state) => {
        state.loading = true;
      })
      .addCase('addcommentSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
       
      })
      .addCase('addcommentFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
       
      })

      .addCase('deletecommentRequest', (state) => {
        state.loading = true;
      })
      .addCase('deletecommentSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('deletecommentFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('newPostRequest', (state) => {
        state.loading = true;
      })
      .addCase('newPostSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('newPostFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('updateCaptionRequest', (state) => {
        state.loading = true;
      })
      .addCase('updateCaptionSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('updateCaptionFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('deletepostRequest', (state) => {
        state.loading = true;
      })
      .addCase('deletepostSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('deletepostFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('updateprofileRequest', (state) => {
        state.loading = true;
      })
      .addCase('updateprofileSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('updateprofileFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase('updatepasswordRequest', (state) => {
        state.loading = true;
      })
      .addCase('updatepasswordSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('updatepasswordFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('deleteprofileRequest', (state) => {
        state.loading = true;
      })
      .addCase('deleteprofileSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('deleteprofileFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('forgetPasswordRequest', (state) => {
        state.loading = true;
      })
      .addCase('forgetPasswordSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('forgetPasswordFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('resetPasswordRequest', (state) => {
        state.loading = true;
      })
      .addCase('resetPasswordSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('resetPasswordFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('followUserRequest', (state) => {
        state.loading = true;
      })
      .addCase('followUserSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('followUserFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('clearErrors',(state)=>{
        state.error=null;
    })
    .addCase('clearMessage',(state)=>{
        state.message =null;
    })
      
  });

  export const mypostsReducer = createReducer(initialState, (builder) => {
    builder
      .addCase('mypostsRequest', (state) => {
        state.loading   = true;
      })
      .addCase('mypostsSuccess', (state, action) => {
        state.loading = false;
        state.posts = action.payload;
       
      })
      .addCase('mypostsFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
         })
       .addCase('clearErrors',(state)=>{
          state.error=null;
      })

    });

    export const userPostsReducer = createReducer(initialState, (builder) => {
      builder
        .addCase('userpostsRequest', (state) => {
          state.loading   = true;
        })
        .addCase('userpostsSuccess', (state, action) => {
          state.loading = false;
          state.posts = action.payload;
          })
        .addCase('userpostsFailure', (state, action) => {
          state.loading = false;
          state.error = action.payload;
           })
         .addCase('clearErrors',(state)=>{
            state.error=null;
        })
  
      });


















