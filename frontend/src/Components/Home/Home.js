import React, { useEffect } from 'react'
import "./Home.css"
import User from '../User/User'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getFollowingPosts } from '../../Actions/User'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'
import { useAlert } from 'react-alert'
function Home() {

const dispatch =useDispatch();
const alert=useAlert();

const {loading,posts,error}=useSelector(state=>state.postofFollowing)

const{users,loading:usersLoading}=useSelector(
  (state)=>state.allUsers
);
const {error:likeError,message}=useSelector((state)=>state.like)

useEffect(()=>{
dispatch(getFollowingPosts());
dispatch(getAllUsers());
},[dispatch])

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

  return (
loading===true || usersLoading===true?<Loader/>:
   (
   
   <div className='home'>

    <div className='homeleft'>
  
{ posts && posts.length>0 ? (posts.map((post)=>{
 return <Post key={post._id}
  // postimage="https://im.indiatimes.in/content/2023/Jul/Untitled-design---2023-07-11T160433058_64ad303a6e0ff.png?w=725&h=543&cc=1" 
  //  ownerName="Punnnet superstar"
  
  postid={post._id}
  caption={post.caption}
  postimage={post.image.url}
  likes = {post.likes}
  comments ={post.comments}
  ownerImage={post.owner.avatar.url}
  ownerName={post.owner.name}
  ownerId={post.owner._id}
 

  />
})):(<Typography variant='h6'>No post Fond</Typography>)}
        </div>
    <div className='homeright'>
    { users && users.length>0 ? (users.map((user)=>{
 return <User 
  key={user._id}
  userid={user._id} 
  name={user.name} 
  avatar={user.avatar.url}/>
})):(<Typography variant='h6'>No user Fond</Typography>)}

    </div>
    
    </div>)
  )
}

export default Home