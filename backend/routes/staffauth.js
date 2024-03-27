const bcrypt=require('bcryptjs');
const express=require('express');
const router=express.Router();
const User = require("../models/User");
const {body,validationResult}=require("express-validator");
const UserApi = require('../controller/userController');


router.post('/login',UserApi.staffLogin);
router.post('/register',[body('password','enter minimum of 5 letters').isLength({min:8})],UserApi.staffRegister)
router.post('/validate',async(req,res,next)=>{
    try {
        let success=false;
        User.findOne({_id:req.body.id})
        .then((data)=>{
            if(data.type==='0'){
                success=true;
            console.log(data);
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