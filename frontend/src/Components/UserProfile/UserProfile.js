

import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { followandUnfollow,  getuserPosts, getuserProfile } from '../../Actions/User'
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useAlert } from 'react-alert'

import User from '../User/User';
import {useParams} from 'react-router-dom'
function  UserProfile() {
const dispatch=useDispatch();
const alert=useAlert();
const {user:me}=useSelector((state)=>state.user);  
const {loading,error,posts} =useSelector((state)=>state.userPosts)
const {error:followError,message,loading:followloading}=useSelector((state)=>state.like)


const {user ,loading:userloading,error:userError }=useSelector((state)=>state.userProfile);  

const params=useParams();
const[follwerstoggle,setfollowerstoggle]=useState(false);
const[followingtoogle,setfollowingtoogle]=useState(false);
const[following,setfollowing]=useState(false);
const[myProfile ,setmyProfile]=useState(false);
const followhandler=async()=>{
    setfollowing(!following);
    await dispatch(followandUnfollow(user._id))
    dispatch(getuserProfile(params.id));
}
useEffect(()=>{
  dispatch(getuserPosts(params.id));
  dispatch(getuserProfile(params.id));
  
  },[dispatch,params.id])
  
  useEffect(()=>{
    if(me._id===params.id){
      setmyProfile(true);
    }
  if(user){
    user.followers.forEach((item)=>{
      if(item._id===me._id){
        setfollowing(true);
      }
      else{
        setfollowing(false);
      }
    })
  }
  
  
    },[user,me._id,params.id])


useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch({type:"clearErrors"});
    }
    if(followError){
      alert.error(followError);
      dispatch({type:"clearErrors"});
    }
    if(userError){
      alert.error(userError);
      dispatch({type:"clearErrors"});
    }
    
    if(message){
      alert.success(message);
      dispatch({type:"clearMessage"});
    }
  },[alert,followError,userError,message,error,dispatch]) ;

  


  return (

    loading===true || userloading===true?<Loader/>:(
        <div  className='account'>
        <div className="accountleft">
        {( posts && posts.length>0)?(posts.map((post)=>{
 return <Post key={post._id}
 
    postid={post._id}
  caption={post.caption}
  postimage={post.image.url}
  likes = {post.likes}
  comments ={post.comments}
 ownerImage={post.owner.avatar.url}
  ownerName={post.owner.name}
  ownerId={post.owner._id}
 
  />
})):( <Typography variant='h6'>User has not made any posts</Typography>)}
        </div>
  
      <div className="accountright">
   
      {user &&(
        <>
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

{myProfile ? null:(<Button onClick={followhandler} disabled={followloading}  variant='contained'>{following ? "Unfollow":"Follow"}</Button>
      )} 
        </>
      ) }


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
      ))):(<Typography style={{ margin:"2vmax" }}>you have No folowers</Typography>)}
 
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


export default UserProfile