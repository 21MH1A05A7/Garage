const express=require('express');
const bcrypt=require('bcryptjs');
const User = require('../models/User');
const UserApi = require('../controller/userController');
const router=express.Router();
const salt=10;

router.post('/login',UserApi.staffLogin);

router.post('/register',async(req,res,next)=>{
    // console.log("hi");
    const hashedPassword=await bcrypt.hash("12345",salt);
    // console.log(hashedPassword);
    const data={
        "username":"9177",
        "password":hashedPassword,
        "type":"4"
    }
    console.log(data);
    const d=await User.insertMany(data);
    console.log(d);
    res.send(d);
})

router.post('/validate',async(req,res,next)=>{
    try {
        let success=false;
        User.findOne({_id:req.body.id})
        .then((data)=>{
            console.log(data);
            if(data.type==='1'){
                success=true;
                res.send({data,success});
            }
            else{
                res.send({success});
            }
            
        })
        .catch((err)=>{
            res.send({success});
        })
    } catch (error) {
        res.send(400,"Server is not Working");
    }
})



module.exports=router;