import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";

export const connectDB = expressAsyncHandler(async ()=>{
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    if(connect){
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } else {
        console.log("Error connecting to MongoDB");
        process.exit(1);
    }
});