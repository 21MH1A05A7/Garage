const bcrypt=require('bcryptjs');
const express=require('express');
const router=express.Router();
const User = require("../models/User");
const {body,validationResult}=require("express-validator");
const UserApi = require('../controller/userController');


router.post('/gm/validate',async(req,res,next)=>{
    try {
        let success=false;
        User.findOne({_id:req.body.id})
        .then((data)=>{
            // console.log(data);
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

router.post('/acao/validate',async(req,res,next)=>{
    try {
        let success=false;
        User.findOne({_id:req.body.id})
        .then((data)=>{
            // console.log(data);
            if(data.type==='2'){
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


router.post('/vc/validate',async(req,res,next)=>{
    try {
        let success=false;
        User.findOne({_id:req.body.id})
        .then((data)=>{
            // console.log(data);
            if(data.type==='3'){
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

router.post('/cashier/validate',async(req,res,next)=>{
    try {
        let success=false;
        User.findOne({_id:req.body.id})
        .then((data)=>{
            // console.log(data);
            if(data.type==='4'){
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