
const User = require('../models/User');


const fetchUser=async (req,res,next)=>{
    const data=await User.findOne({_id:req.headers.id});
    console.log(data);
    req.user=data;
    next();
}

module.exports=fetchUser;