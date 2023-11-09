import mongoose from "mongoose";


const connectDB  = (url: string) => mongoose.connect(url).then(() => console.log("database connected"));

export default connectDB;