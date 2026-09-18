import mongoose from "mongoose";
import dns from "node:dns";
import dotenv from "dotenv";
dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDb = async () => {
  const URI = process.env.MONGODB_URI;

  if (!URI) {
    throw new Error("URI environment variable is not defined");
  }

  await mongoose.connect(URI);
};


