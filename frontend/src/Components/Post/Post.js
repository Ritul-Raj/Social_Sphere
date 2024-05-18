import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography,Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";

import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { addcommentOnPost, deletepost, likePost, updateCaptionn } from "../../Actions/Post";
import { getFollowingPosts, getmyPosts, loadUser } from "../../Actions/User";
import User from "../User/User";
import Commentcard from "../CommentCard/Commentcard";
// import { useAlert } from "react-alert";

function Post({
  postid,
  caption,
  postimage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount =false,
}) 

{

  const[liked,setliked]=useState(false);
  const [likesuser,setlikesuser]=useState(false);
  const[commentValue,setcommentValue]=useState("");
  const[commentToggle,setcommentToggle]=useState(false);
  const[captionValue,setcaptionValue]=useState("");
  const[captionToggle,setcaptionToggle]=useState(false);

  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.user)

  const handleLike=async()=>{
    setliked(!liked);
    await dispatch(likePost(postid));

    dispatch(getFollowingPosts());
   if(isAccount){
    // console.log(`bring mmy post`)
    dispatch(getmyPosts())
   }
   else{
    dispatch(getFollowingPosts())
   }
  }
 
  const addcommenthandler=async(e)=>{
    e.preventDefault();
   await dispatch(addcommentOnPost(postid,commentValue));

   if(isAccount){
    dispatch(getmyPosts())
   }
   else{
    dispatch(getFollowingPosts());
   }
  }
const updatecaptionhandler=async(e)=>{
  e.preventDefault();
  // await
  dispatch(updateCaptionn(captionValue,postid));
  dispatch(getmyPosts())
}

const deletepostHandler=async()=>{
await dispatch(deletepost(postid));
dispatch(getmyPosts());
dispatch(loadUser());
}



 useEffect(()=>{
  likes.forEach((item)=>{
    if(item._id===user._id){
      setliked(true);
    } 
  })
 },[likes,user._id])

  return (
    <div className="post">
      <div className="postHeader">
      {isAccount?<Button onClick={()=>setcaptionToggle(!captionToggle)}><MoreVert/></Button>:null}</div>
     
      <img src={postimage} alt="post" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}

        onClick={()=> setlikesuser(!likesuser)} 
        disabled={likes.length===0?true:false}
      >
        <Typography>{likes.length}likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
         {liked?<Favorite style={{color:"red"}} /> :<FavoriteBorder/>}
        </Button>

        <Button onClick={()=> setcommentToggle(!commentToggle)} >
          <ChatBubbleOutline />
        </Button>
        {
          isDelete?<Button onClick={deletepostHandler} >
          <DeleteOutline />
        </Button> :null
        }
      </div>
    <Dialog open={likesuser} 
    onClose={()=> setlikesuser(!likesuser)} >
     <div className="DialogBox">
      <Typography variant="h4">Liked By</Typography>
       {likes.map((like)=>{
        return <User key={like._id} 
           userid={like._id}
           name={like.name} 
           avatar={like.avatar.url}
          />
        })

        } 

     </div>
      
    </Dialog>


    <Dialog open={commentToggle} 
    onClose={()=> setcommentToggle(!commentToggle)} >
     <div className="DialogBox">
      <Typography variant="h4">comments</Typography>
     <form className="commentForm" onSubmit={addcommenthandler} >

      <input type="text"
       value={commentValue} 
       onChange={(e)=>{setcommentValue(e.target.value)}}
       placeholder="Comment Here....." 
        required
       />
       
       <Button type="submit" variant="contained">Add</Button>

     </form>
      {comments.length>0 ? 
     comments.map(item=>
       {
        return <Commentcard 
     key={item._id} userid={item.user._id} 
     name={item.user.name} avatar={item.user.avatar.url} comment={item.comment} commentid={item._id} postid={postid} isAccount={isAccount} />
       }
       ):<Typography>No comm ents yet</Typography>}

     </div>
      
    </Dialog>

    
    <Dialog open={captionToggle} 
    onClose={()=> setcaptionToggle(!captionToggle)} >
     <div className="DialogBox">
      <Typography variant="h4">Update Caption</Typography>
     <form className="commentForm" onSubmit={updatecaptionhandler} >

      <input type="text"
       value={captionValue} 
       onChange={(e)=>{setcaptionValue(e.target.value)}}
       placeholder="Caption Here....." 
        required
       />
       
       <Button type="submit" variant="contained">Update</Button>

     </form>
     </div>
    </Dialog>



    </div>
  );
}

export default Post;
