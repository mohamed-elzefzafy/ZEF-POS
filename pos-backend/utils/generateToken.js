import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
dotenv.config({path : "./config.env"});


const generateToken = (res , userId) => {
  const token = jwt.sign({userId : userId} , process.env.JWT_SECRET , {expiresIn : "30d"});

  res.cookie("token" , token, {
    httpOnly : true,
    secure: true,
    sameSite: 'strict',
    maxAge : 30 * 24 * 60 * 60 * 1000,
    // secure: true,
    sameSite: 'none',
  }) 
}

export default generateToken;