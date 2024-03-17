const express=require('express');
const bcrypt=require('bcryptjs');
const User = require('../models/User');
const UserApi = require('../controller/userController');
const router=express.Router();
const salt=10;

router.post('/login',UserApi.staffLogin);
router.post('/register',async(req,res,next)=>{
    const hashedPassword=await bcrypt.hash("12345",salt);
    const data={
        "username":"Aditya",
        "password":hashedPassword,
        "type":"4"
    }
    const d=await User.insertMany(data);
    console.log(d);
    res.send(d);
})

module.exports=router;