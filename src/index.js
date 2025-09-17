// always use 'try catch' jyare database thi connect karta hoy to.. ane async wait lagavvu


import dotenv from "dotenv"
dotenv.config();
import mongoose, { connect } from "mongoose"
import express from "express"
const app = express();

import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

// ( async () => {
//     try {
//        await mongoose.connect( `${process.env.MONGODB_URI}/${process.env.DB_NAME}` );
//        app.on("error", () => {
//         console.log(`error in connecting to port ${process.env.PORT}`);
//        })

//        app.listen(process.env.PORT, () => {
//         console.log(`server is running at port ${process.env.PORT}`);
//        })
        
//     } catch (error) {
//         console.log("Error while connecting to MongoDB", error);
//         throw error;
//     }

// })()  this is the first professional approach to connect the database

//second professional approach is to create a separate file for database connection

connectDB(); // calling the function to connect the database
