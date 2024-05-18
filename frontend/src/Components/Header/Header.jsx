import React, { useState } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import {
    Home,
    HomeOutlined,
    Add,
    AddOutlined,
    SearchOutlined,
    Search,
    AccountCircle,
    AccountCircleOutlined,
} from "@mui/icons-material"



function Header() {

 const[tab,settab]=useState(window.location.pathname);
 
  return (
    <div className='header'>

<Link to="/"  onClick={()=> settab("/")}>
{tab==="/" ? <Home style={{color:"black"}} /> :<HomeOutlined/> }
</Link>

<Link to="/newpost" onClick={() => settab("/newpost")}>
{tab === "/newpost" ? (<Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
        )}
</Link>

<Link to="/search" onClick={() => settab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "black" }} />
        ) : (
          <SearchOutlined />
        )}
</Link>

<Link to="/account" onClick={() => settab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
</Link>

    </div>
  )
}

export default Header