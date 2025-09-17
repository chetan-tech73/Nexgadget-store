import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) 
    return;

  if (!process.env.MONGODB_URI) {
    throw new Error("please add MONGODB_URI to the .env");
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "nexgadget"
    });

  isConnected = db.connections[0].readyState === 1;
  console.log("MongoDB connected:", db.connection.host);
  }catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
}