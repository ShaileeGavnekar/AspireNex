// import mongoose from "mongoose";

// export default async function connect(){
//     await mongoose.connect(process.env.ATLAS_URI)
//     console.log("Database Connected")
// }
import mongoose from 'mongoose';
import { config } from 'dotenv';

config(); // Load environment variables

const connect = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    throw error;
  }
};

export default connect;
