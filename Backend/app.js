import express  from "express";
import { connectDb } from "./config/database.js";
const app=express();   //  initializes your web application using Express, and app will be the object you use to define how your server should behave.

import { config } from "dotenv";  // config is a function that loads the environment variables into process.env
import postrouter from "./routes/Post.js";
import userrouter from "./routes/User.js";
import cookieParser from "cookie-parser";

import cors from "cors"

import cloudinary from "cloudinary";

// app.use(cors());   //cors() allows the server to receive requests from different domains. 

app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend domain
}));          

if(process.env.NODE_ENV!=="production"){  ///The environment configuration (config({path:"./config/.env"})) only runs if the server isn't in production mode. 
    config({path:"./config/.env"}) ;      //It loads variables from a .env file.
}

//using middlewares //mandatory step
app.use(express.json({limit:"50mb"}));    //Sets a maximum size limit for the incoming JSON payload to 50 megabytes. If a request tries to send more data than this limit, the server will reject it to avoid overloading the system.
app.use(express.urlencoded({limit:"50mb",extended:true})); // This middleware allows the app to handle incoming URL-encoded data, which is typically how form data is sent (e.g., from HTML forms). with a size limit of 50MB.and convert data in json format or other format
app.use(cookieParser());

app.use("/api/v1",postrouter)   //app.use("/api/v1", postrouter) and app.use("/api/v1", userrouter) add routes for posts and users, which means when the server gets requests to /api/v1/posts or /api/v1/users, it will use these specific routers (handled in other files).

app.use("/api/v1",userrouter)

connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,  // process.env is a global object in Node.js that provides access to environment variables.
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const PORT=process.env.PORT || 4000;

app.listen (PORT,()=>{    
console.log(`server is running on port ${PORT}`)
})