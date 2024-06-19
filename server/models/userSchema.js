import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        trim:true,
    },
    lastname:{
        type: String,
        required: true,
        trim:true,
    },
    username:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
        index:true,
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type: String,
        required:true,
    },
    phone:{
        type: String,
        required:true,
    },
    profile:{
        type:String,
        required:true,
    }
})

const User=mongoose.model('user', userSchema);
export default User;