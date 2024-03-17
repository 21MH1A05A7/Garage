const bcrypt=require('bcryptjs');
const express=require('express');
const router=express.Router();
const User = require("../models/User");
const {body,validationResult}=require("express-validator");
const UserApi = require('../controller/userController');


router.post('/login',UserApi.staffLogin);
router.post('/register',[body('password','enter minimum of 5 letters').isLength({min:8})],UserApi.staffRegister)



module.exports=router;