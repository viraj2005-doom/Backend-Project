import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
    try {
       const connectionawait =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`mongo db connected: ${connectionawait.connection.host}`);
        
    } catch (error) {
        console.log("Error while connecting to MongoDB", error);
        process.exit(1); // Exit the process with failure
    }
}


export default connectDB;