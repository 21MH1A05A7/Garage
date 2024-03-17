const express=require('express');
// import connectToMongo from "../models/User.js";
const connectToMongo=require('./config/db.js');
const cors=require('cors');


const app=express();
app.use(express.json());
connectToMongo();
app.use(cors());


app.use('/staffauth',require('./routes/staffauth.js')); 
app.use('/staffauth',require('./routes/staffauth.js'));
app.use('/officials',require('./routes/officials.js'));
app.use('/officials',require('./routes/officials.js'));
app.use('/voucher',require('./routes/vocher.js'));


app.listen(5000,()=>{
    console.log("Running on 5000");
})