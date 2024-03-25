import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGODB_URI as string;

export const connectToDB = async () => {
  try {
    await mongoose.connect(mongoUri || "");
    console.log("Successfully connected to Database");
  } catch (error) {
    console.error(error);
  }
};
