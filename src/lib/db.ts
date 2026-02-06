import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    console.log('connecting')
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB conn : ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB conn error :`, error);
  }
};
