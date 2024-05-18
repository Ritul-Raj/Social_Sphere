import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
function User({userid,name,avatar}) {
  return (
   <Link to={`/user/${userid}`} className='homeUser' >
    <img src={avatar} alt={name}/>
    <Typography>{name}</Typography>
   </Link>
  )
}

export default User