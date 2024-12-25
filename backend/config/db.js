import mongoose from "mongoose";

export const connectDB = async () =>{
  await mongoose.connect('mongodb+srv://shivanshmangla72:Hello123@cluster0.qysnc.mongodb.net/food-del').then(()=>{
    console.log("MongoDB connected!!")
  });
}