
const User = require('../models/User');

const fetchUser=async (req,res,next)=>{
    // console.log(req.headers);
    const data=await User.findOne({_id:req.headers.id})
    req.user=data;
    next();
    // .then((data)=>{
    //     console.log(data);
    //     req.user=data;
    // })
    // .catch((err)=>{
    //     console.log("No User was found");          
    // })
    // next();
}

module.exports=fetchUser;