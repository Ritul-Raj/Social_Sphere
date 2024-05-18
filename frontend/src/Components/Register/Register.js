import React, { useEffect, useState } from 'react'
import "./Register.css"
import { Avatar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Actions/User';
import { useAlert } from 'react-alert';
function Register() {
const [name,setname]=useState("");
const [email,setemail]=useState("");
const [avatar,setavatar]=useState("");
const [password,setpassword]=useState("");
const dispatch =useDispatch();
const alert=useAlert();
const{loading ,error}=useSelector((state)=>state.user)

const submithandler=(e)=>{
e.preventDefault();
dispatch(registerUser(name,email,password,avatar))
}
useEffect(()=>{
if(error){
  alert.error(error);
   dispatch({type:"clearErrors"})
}
})
const handleImageChange=(e)=>{
  const file=e.target.files[0];
  const Reader=new FileReader();


  Reader.readAsDataURL(file);

  Reader.onload=()=>{
      if(Reader.readyState===2){
          setavatar(Reader.result);
      }
  }
 };
  return (
    <div className='register'>
        <form className="registerForm" onSubmit={submithandler}>
        <Typography variant="h3" style={{padding:"2vmax"}}>Socila App</Typography>
       <Avatar src={avatar}
       alt='user' sx={{height:"10vmax" ,width:"10vmax"}} />
        <input type='file' accept='image/*' onChange={handleImageChange} />

        <input className='registerInputs' type='text' placeholder='Enter Name' value={name}  required onChange={(e)=>{
           setname(e.target.value)}}/>
 
        <input className='registerInputs' type="email"     placeholder="Email" value={email} required onChange={(e)=>{
           setemail(e.target.value);
        }}   />

        <input className='registerInputs' type="password"   placeholder="Password"   value={password} required onChange={(e)=>{
          setpassword(e.target.value);
        }}      />
    <Link to="/"><Typography>Already Register ? Login Now</Typography></Link>
        <Button disabled={loading} type="submit">Sign Up</Button>
        
        </form>
    </div>
  )
}

export default Register