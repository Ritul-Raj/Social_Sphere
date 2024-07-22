import express  from "express";
import { connectDb } from "./config/database.js";
const app=express();  
import { config } from "dotenv";
import postrouter from "./routes/Post.js";
import userrouter from "./routes/User.js";
import cookieParser from "cookie-parser";

import cors from "cors"

import cloudinary from "cloudinary";


app.use(cors());


if(process.env.NODE_ENV!=="production"){
    config({path:"./config/.env"}) ;
}

//using middlewares //mandatory step
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookieParser()) ;

app.use("/api/v1",postrouter)

app.use("/api/v1",userrouter)



connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const PORT=process.env.PORT || 4000;

app.listen (PORT,()=>{
console.log(`server is running on port ${PORT}`)
})