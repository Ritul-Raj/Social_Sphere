import "./Updateprofile.css";
import React, { useEffect, useState } from "react";

import { Avatar, Button, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { loadUser,updateprofile } from "../../Actions/User";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
function Updateprofile() {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateloading,
    error: updateerror,
    message,
  } = useSelector((state) => state.like);

  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [avatar, setavatar] = useState("");
  const [avatarprev, setavatarprev] = useState(user.avatar.url);
  const dispatch = useDispatch();
  const alert = useAlert();

  const submithandler = async(e) => {
    e.preventDefault();
   await dispatch(updateprofile(name, email,avatar));
   dispatch(loadUser());
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateerror) {
      alert.error(updateerror);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setavatar(Reader.result);
        setavatarprev(Reader.result);
      }
    };
  };
  return (
    loading?<Loader/>:(
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submithandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Socila App
        </Typography>
        <Avatar
          src={avatarprev}
          alt="user"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          className="updateProfileInputs"
          type="text"
          placeholder="Enter Name"
          value={name}
          required
          onChange={(e) => {
            setname(e.target.value);
          }}
        />

        <input
          className="updateProfileInputs"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />

        {/* <input className='registerInputs' type="password"   placeholder="Password"   value={password} required onChange={(e)=>{
          setpassword(e.target.value);
        }}  /> */}
        {/* <Link to="/"><Typography>Already Register ? Login Now</Typography></Link> */}

        <Button disabled={updateloading} type="submit">
Update
        </Button>
      </form>
    </div>)
  );
}

export default Updateprofile;
