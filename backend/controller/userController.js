const bcrypt=require('bcryptjs');
const express=require('express');
const router=express.Router();
const User = require("../models/User");
const {body,validationResult}=require("express-validator");


const UserApi = {
    staffLogin : async (req,res,next)=>{
        console.log(req.body);
        const {username,password,type}=req.body;
    // const hashedPassword=await bcrypt.hash(password,10);
    /// Connect to DB and check for the user credentials;
    try{
        // let remote_user=await User.findOne(username); // user name from the database using findOne
        // console.log("hi");
        let success=false;
        User.findOne({username:username,type:type})
        .then(async (DB_User)=>{
            if(DB_User){
                // console.log(DB_User);
                // const userDetails=DB_User.username;// password from the database
                const pass=DB_User.password; //crypted password
                try{
                    const validate=await bcrypt.compare(password,pass);
                    console.log(validate);
                    if(!validate){
                        res.send({success});
                    }   
                    success=true;
                    res.send({DB_User,success});
            }
                catch{
                    res.status(400,"Credentials are not found or are not correct");
                }
            }
            else{
                res.send({success});
            }
        })
        .catch((err)=>{
            res.send({success});
        })
    }
    catch{
        res.status(500,"Check the Network or there is a server error");
    }
    },

    staffRegister:async (req,res,next)=>{ // password can be manual or default for all the staff members
        const result=validationResult(req);
        try{
                const {name,username,password}=req.body;
                console.log(name);
                const hashedPassword=await bcrypt.hash(password,10);
                const d={
                    "name":name,
                    "username":username,
                    "password":hashedPassword,
                    "type":"0"
                }
                console.log(d);
                const data=await User.insertMany(d);
                res.send(data);
        }
        catch{
            res.send("Check the Credentials");
        }
        
    },

    officialLogin:async(req,res,next)=>{

    }

}



module.exports=UserApi;