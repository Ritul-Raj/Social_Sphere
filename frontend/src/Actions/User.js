import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          // withCredentials:true
        },
      }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postofFollowingRequest",
    });

    const { data } = await axios.get("/api/v1/posts");
    dispatch({
      type: "postofFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postofFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = (name="") => async (dispatch) => {
  try {
    dispatch({
      type: "allUserRequest",
    });
    const { data } = await axios.get(`/api/v1/users?name=${name}`);
    dispatch({
      type: "allUserSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "allUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getmyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "mypostsRequest",
    });

    const { data } = await axios.get("/api/v1/my/posts");
    dispatch({
      type: "mypostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "mypostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    await axios.get("/api/v1/logout");

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(
        "/api/v1/register",
        { name, email, password, avatar },
        {
          headers: {
            "Content-Type": "application/json",
            // withCredentials:true
          },
        }
      );

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateprofile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateprofileRequest",
    });

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
          // withCredentials:true
        },
      }
    );

    dispatch({
      type: "updateprofileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateprofileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatepassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatepasswordRequest",
      });

      const { data } = await axios.put(
        "/api/v1/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            // withCredentials:true
          },
        }
      );

      dispatch({
        type: "updatepasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatepasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteMyProfile =
  () => async (dispatch) => {
    try {
      dispatch({
        type: "deleteprofileRequest",
      });

      const { data } = await axios.delete(
        "/api/v1/delete/me");

      dispatch({
        type: "deleteprofileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteprofileFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const forgotPassword =
  (email) => async (dispatch) => {
    try {
      dispatch({
        type: "forgetPasswordRequest",
      });

      const { data } = await axios.post(
        "/api/v1/forgot/password" ,
        {email},
        {headers:{
          "Content-Type":"application/json",
        }}
        );

      dispatch({
        type: "forgetPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "forgetPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

  
  export const resetPassword =
  (token,password) => async (dispatch) => {
    try {
      dispatch({
        type: "resetPasswordRequest",
      });

      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        {password},
        {headers:{
          "Content-Type":"application/json",
        }}
        );

      dispatch({
        type: "resetPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "resetPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };



  export const getuserPosts = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userpostsRequest",
      });
  
       const { data } = await axios.get(`/api/v1/userposts/${id}`);
       dispatch({
        type: "userpostsSuccess",
        payload: data.posts,
        });
        } catch (error) {
         dispatch({
        type: "userpostsFailure",
        payload: error.response.data.message,
        });
    }
  };
  
  export const getuserProfile = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userProfileRequest",
      });
  
       const { data } = await axios.get(`/api/v1/user/${id}`);
       dispatch({
        type: "userProfileSuccess",
        payload: data.user,
        });
        } catch (error) {
         dispatch({
        type: "userProfileFailure",
        payload: error.response.data.message,
        });
    }
  };

  export const followandUnfollow = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "followUserRequest",
      });
  
       const { data } = await axios.get(`/api/v1/follow/${id}`);
       dispatch({
        type: "followUserSuccess",
        payload: data.message,
        });
        } catch (error) {
         dispatch({
        type: "followUserFailure",
        payload: error.response.data.message,
        });
    }
  };