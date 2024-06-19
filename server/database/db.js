import mongoose from "mongoose";
import dotenv from 'dotenv';




export const connection=async()=>{
    try {
      dotenv.config();

      const uri=process.env.DB_URI;
    const mongoUri="mongodb+srv://ghulammujtaba1016:BA1qbT4EnWunpmB7@cluster0.krfn6cs.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(mongoUri, { useNewUrlParser: true })
    
      console.log("Connected to MongoDB");
      
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
    
  
}