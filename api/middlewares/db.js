import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://wwwrahulveeru12345:jin%40kazama123@cluster0.i0rxtmb.mongodb.net/Blog"
    );
    //await mongoose.connect(process.env.MONGODB_LINK);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
}
