import mongoose from "mongoose"
import path from "path";
import dotenv from "dotenv";
dotenv.config({path : "./config.env"});

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL) ;
    console.log("Connected to MongoDB successfully") ;
  } catch (error) {
    console.log("connection failed to MongoDB : " , error);
    process.exit(1);
  }
}


export default connectDb;