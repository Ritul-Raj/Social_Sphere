import React, { useEffect } from 'react'
import {BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import Header from './Components/Header/Header'
// import { Login } from '@mui/icons-material'


import Login from './Components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './Actions/User'
import Home from './Components/Home/Home'
import Account from './Components/Account/Account'
import NewPost from './Components/NewPost/NewPost'
import Register from './Components/Register/Register'
import Updateprofile from './Components/Updateprofile/Updateprofile'
import Updatepassword from './Components/UpdatePassword/Updatepassword'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import UserProfile from './Components/UserProfile/UserProfile'
import Search from './Components/Search/Search'
import NotFound from './Components/NotFound/NotFound'
function App() {

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  },[dispatch])

const {isAuthenticated}=useSelector((state)=>state.user)

  return (

    <Router>
    {isAuthenticated && <Header/>}

    <Routes>
    <Route path="/" element={isAuthenticated ?<Home/>: <Login/>}/>
    <Route path='/account' element={isAuthenticated ? <Account/>:<Login/>}></Route>
    <Route path='/newpost' element={isAuthenticated ? <NewPost/>:<Login/>}></Route>
    <Route path='/register' element={isAuthenticated ? <Account/>:<Register/>}></Route>
    <Route path='/update/profile' element={isAuthenticated ? <Updateprofile/>:<Login/>}></Route>
    <Route path='/update/password' element={isAuthenticated ?<Updatepassword/>:<Login/>}></Route>
   
    <Route path='/forgot/password' element={isAuthenticated ?<Updatepassword/>:<ForgetPassword/>}></Route>
    <Route path='/password/reset/:token' element={isAuthenticated ?<Updatepassword/>:<ResetPassword/>}></Route>
    <Route path='/user/:id' element={isAuthenticated ?<UserProfile/>:<Login/>}></Route>
    <Route path='search' element={isAuthenticated ?<Search/>:<Login/>}></Route>
    <Route path='*' element={<NotFound/>}></Route>

    </Routes>
    </Router>
   
  )
}

export default App