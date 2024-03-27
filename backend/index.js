const express=require('express');
// import connectToMongo from "../models/User.js";
const connectToMongo=require('./config/db.js');
const cors=require('cors');
const multer  = require('multer')
// const upload = multer({ dest: '../src/images' })



const app=express();
app.use(express.json());
connectToMongo();
app.use(cors());


app.use('/staffauth',require('./routes/staffauth.js')); 
app.use('/staffauth',require('./routes/staffauth.js'));
app.use('/officials',require('./routes/officials.js'));
app.use('/officials',require('./routes/officials.js'));
app.use('/voucher',require('./routes/vocher.js'));
app.use('/auth',require('./routes/validation.js'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../src/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,uniqueSuffix+file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })


app.post('/upload',upload.single('image'),async (req,res,next)=>{
    console.log("uploaded!!");
    res.send(req.file.filename);
})




app.listen(5000,()=>{
    console.log("Running on 5000");
})