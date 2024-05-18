import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";
function Login() {

const[email,setemail]=useState("");
const[password,setpassword]=useState("");
const dispatch=useDispatch();
const alert = useAlert();

const { error } = useSelector((state) => state.user);
const { message } = useSelector((state) => state.like);

const loginHandler = (e) => {
  e.preventDefault();

  dispatch(loginUser(email, password));
};

useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch({ type: "clearErrors" });
  }
  if (message) {
    alert.success(message);
    dispatch({ type: "clearMessage" });
  }
}, [alert, error, dispatch,message]);

       


  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler} >
      <Typography variant="h3" style={{padding:"2vmax"}}>Socila App</Typography>
        <input type="email"    id="email" placeholder="Email" value={email} onChange={(e)=>{
           setemail(e.target.value);
        }}   />

        <input type="password"   id="password" placeholder="Password"   value={password}  onChange={(e)=>{
          setpassword(e.target.value);
        }}      />
    <Link to="/forgot/password">
   <Typography>Forgot Password</Typography>
   </Link>
        <Button type="submit">Login</Button>
        
        <Link to="/register">
   <Typography>New User?</Typography>
   </Link>

      </form>
    </div>
  );
}

export default Login;
