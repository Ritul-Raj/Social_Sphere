import axios from "axios";
export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });
    const { data } = await axios.get(`/api/v1/post/${id}`);
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addcommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addcommentRequest",
    });
    const { data } = await axios.put(
      `/api/v1/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "addcommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addcommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletecommentOnPost = (id, commentid) => async (dispatch) => {
  try {
    dispatch({
      type: "deletecommentRequest",
    });
    const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
      data:{commentid},
    });

    dispatch({
      type: "deletecommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletecommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const CreateNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });
    const { data } = await axios.post(`/api/v1/post/upload`, {
      caption,
      image,
    },{
      headers:{
        "Content-Type":"application/json"
      }
    });

    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};
export const updateCaptionn = (caption,id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });
    const { data } = await axios.put(`/api/v1/post/${id}`, {
      caption,
      
    },{
      headers:{
        "Content-Type":"application/json"
      }
    });

    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletepost= (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletepostRequest",
    });
    const { data } = await axios.delete(`/api/v1/post/${id}`);

    dispatch({
      type: "deletepostSuccess",
      payload: data.message,
    });

  } catch (error) {
    dispatch({
      type: "deletepostFailure",
      payload: error.response.data.message,
    });
  }
};