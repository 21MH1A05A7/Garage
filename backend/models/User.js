// import mongoose,{Schema} from "mongoose";
// const schema = mongoose.schema;
const mongoose=require('mongoose');

let register = mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("Users",register);