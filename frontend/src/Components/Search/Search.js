import React, { useState } from 'react'
import "./Search.css"
import {useDispatch, useSelector} from "react-redux"
import {  Button, Typography } from "@mui/material";
import { getAllUsers } from '../../Actions/User';
import User from '../User/User';

function Search() {
    const dispatch=useDispatch();
    const{users,loading}=useSelector(
        (state)=>state.allUsers
      );
const [name,setname]=useState("")
const submithandler=(e)=>{
    e.preventDefault();
    dispatch(getAllUsers(name));
}

  return (
    <div className="search">
    <form className="searchForm" onSubmit={submithandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        Socila App
      </Typography>
      
      
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        required
        onChange={(e) => {
          setname(e.target.value);
        }}
      />



      <Button disabled={loading} type="submit">
    Profile kHOJ
      </Button>

      <div className="searchResults">
   {users && users.map((user)=>{
    return( <User
        key={user._id}
        userId={user._id}
        name={user.name}
        avatar={user.avatar.url}
    />)
})}

</div>
    </form>



  </div>
  )
}

export default Search