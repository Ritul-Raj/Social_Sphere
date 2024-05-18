import React, { useEffect, useState } from 'react'
import "./Account.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteMyProfile, getmyPosts, logoutUser } from '../../Actions/User'
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import User from '../User/User';
function Account() {
const dispatch=useDispatch();
const alert=useAlert();

const logouthandler=async()=>{
  await dispatch(logoutUser());
  alert.success("Logged Out Successfully");
}
const deleteprofilehandler=async()=>{
  await dispatch(deleteMyProfile());
  dispatch(logoutUser());
}
useEffect(()=>{
dispatch(getmyPosts());
},[dispatch])

const {loading,error,posts} =useSelector((state)=>state.myPosts)
const {error:likeError,message,loading:deleteloading}=useSelector((state)=>state.like)
const {user ,loading:userloading }=useSelector((state)=>state.user);  

useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch({type:"clearErrors"});
    }
    if(likeError){
      alert.error(likeError);
      dispatch({type:"clearErrors"});
    }
    
    if(message){
      alert.success(message);
      dispatch({type:"clearMessage"});
    }
  },[alert,likeError,message,error,dispatch]) ;

  const [follwerstoggle,setfollowerstoggle]=useState(false);
  const[followingtoogle,setfollowingtoogle]=useState(false)


  return (

    loading===true || userloading===true?<Loader/>:(
        <div  className='account'>
        <div className="accountleft">
        {( posts && posts.length>0)?(posts.map((post)=>{
 return <Post key={post._id}
  // postimage="https://im.indiatimes.in/content/2023/Jul/Untitled-design---2023-07-11T160433058_64ad303a6e0ff.png?w=725&h=543&cc=1" 
//   ownerName="Punnnet superstar"
    postid={post._id}
  caption={post.caption}
  postimage={post.image.url}
  likes = {post.likes}
  comments ={post.comments}
 ownerImage={post.owner.avatar.url}
  ownerName={post.owner.name}
  ownerId={post.owner._id}
  isAccount={true}
  isDelete={true}
  />
})):( <Typography variant='h6'>You Dont have any posts</Typography>)}
        </div>
  
      <div className="accountright">
      <Avatar 
       src={user.avatar.url} 
       sx={{height:"8vmax" ,width:"8vmax"}}
      />
      <Typography variant='h5' >{user.name}</Typography>
      <div>
        <button onClick={()=> setfollowerstoggle(!followingtoogle)} >
           <Typography> Followers</Typography> 
       </button>
       <Typography>{user.followers.length}</Typography> 
      </div>

      <div>
        <button onClick={()=> setfollowingtoogle(!followingtoogle)}>
           <Typography> Followings</Typography> 
       </button>
       <Typography>{user.followings.length}</Typography> 
      </div>

       <div>
      
           <Typography>Posts</Typography> 
     
       <Typography>{user.posts.length}</Typography> 
      </div>

      <Button variant='contained' onClick={logouthandler}>Logout</Button>
      <Link to="/update/profile">Edit Profile</Link>
      <Link to="/update/password">Change Password</Link>
      <Button onClick={deleteprofilehandler} disabled={deleteloading} variant='text' style={{color:"red",margin:"2vmax"}} >Delete My Profile</Button>


      <Dialog open={follwerstoggle} 
    onClose={()=> setfollowerstoggle(!follwerstoggle)} >
     <div className="DialogBox">
      <Typography variant="h4">Follwers</Typography>
      {user && user.followers.length>0?(user.followers.map((follower)=>(
          <User 
           key={follower._id} 
           userid={follower._id}
           name={follower.name}
          avatar={follower.avatar.url}
          />
      ))):(<Typography style={{ margin: "2vmax" }}>you have No folowers</Typography>)}
 
     </div>
      
    </Dialog>

    <Dialog open={followingtoogle} 
    onClose={()=> setfollowingtoogle(!followingtoogle)} >
     <div className="DialogBox">
      <Typography variant="h4">Follwings</Typography>
      {user && user.followings.length>0?(user.followings.map((item)=>(
         <User key={item._id} 
           userid={item._id}
           name={item.name}
           avatar={item.avatar.url}
          />
      ))):(<Typography style={{ margin: "2vmax" }}>you re Not  following anyone </Typography>)}
       

        

     </div>
      
    </Dialog>


      </div>
      
      </div>
    )
   
  )
}

export default Account