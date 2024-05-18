import React, { useEffect, useState } from "react";
import "./Updatepassword.css";
import { Typography, Button } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updatepassword } from "../../Actions/User";

function Updatepassword() {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const dispatch = useDispatch();
  const alert=useAlert();
const{error,loading,message}=useSelector((state)=>state.like)



  const SubmitHandler = (e) => {
    dispatch(updatepassword(oldPassword,newPassword))
    e.preventDefault();
    
    //console.log(email,password);
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
  });
  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={SubmitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Socila App
        </Typography>

        <input
          type="password"
       required
       className="updatePasswordInputs"
          placeholder="oldPassword"
          value={oldPassword}
          onChange={(e) => {
            setoldPassword(e.target.value);
          }}
        />
        
        <input
          type="password"
         required
         className="updatePasswordInputs"
          placeholder="newPassword"
          value={newPassword}
          onChange={(e) => {
            setnewPassword(e.target.value);
          }}
        />

        <Button disabled={loading} type="submit">Change password</Button>
      </form>
    </div>
  );
}

export default Updatepassword;
