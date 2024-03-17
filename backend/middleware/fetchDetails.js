
const User = require('../models/User');


const fetchUser=async (req,res,next)=>{
    User.findOne({_id:req.headers.id})
    .then((res)=>{
        req.user=res;
    })
    .catch((err)=>{
        console.log("No User was found");          
    })
    // console.log(data);
    // req.user=data;
    next();
}

module.exports=fetchUser;