import customErrorClass from '../utils/customErrorClass.js';
import  jwt  from 'jsonwebtoken';
import path from "path";
import dotenv from "dotenv";
import UserModel from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';
dotenv.config({path : "./config.env"});

//protected roues
export const verifyIsLoggedIn = asyncHandler(async(req , res , next) => {
  const token = req.cookies.token
  if (token) {
try {
  const decoded = jwt.verify(token , process.env.JWT_SECRET);
req.user = await UserModel.findById(decoded.userId).select("-password");
next();
} catch (error) {
  console.log(error);
  return next(customErrorClass.create(`Not authorize Token failed` , 401))
}
  } else {
    return next(customErrorClass.create(`Not authorize No Token` , 401))
  }
})


//admin middleware

export const verifyIsSuperAdmin = asyncHandler(async (req , res , next) => {
  console.log(req.user);
  if (req.user.role === "superAdmin") {
    next();
  } else {
    return next(customErrorClass.create(`Not authorized as a super admin` , 401))
  }
  })
  
  
  //admin only middleware
  export const verifyUserNotAdmin = asyncHandler(async (req , res , next) => {
    if (req.user.role === "admin") {
      next();
    } else {
      return next(customErrorClass.create(`super admin can't access this route` , 401))
    }
    })
    