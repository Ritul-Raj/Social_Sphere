import React from 'react'
import "./commentcard.css"
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deletecommentOnPost } from '../../Actions/Post'
import { getFollowingPosts, getmyPosts } from '../../Actions/User'


function Commentcard(
  { 
    userid,
    name,
    avatar,
    comment,
    commentid,
    postid,
    isAccount
}
) {

  const {user}=useSelector((state)=>state.user);
  const dispatch =useDispatch();
  const deletecommenthandler=()=>{

 dispatch(deletecommentOnPost(postid,commentid))
 if(isAccount){
  dispatch(getmyPosts())
 }
 else{
  dispatch(getFollowingPosts())
 }


   }


  return (
    <div className='commentUser'>
    <Link to={`/user/${userid}`}>
      <img src={avatar} alt={name}></img> 
      <Typography style={{minWidth:"6vmax"}}>{name}</Typography> 
    </Link>
    <Typography>{comment}</Typography>
   
   {
    isAccount?<Button onClick={deletecommenthandler}><Delete/></Button>:
    userid===user._id?<Button onClick={deletecommenthandler} ><Delete/></Button>:null
   }


    
   </div>
  )
}

export default Commentcard