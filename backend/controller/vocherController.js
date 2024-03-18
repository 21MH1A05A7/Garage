const express=require('express');
const bcrypt=require('bcryptjs');
const User = require('../models/User');
const UserApi = require('../controller/userController');
const Voucher=require('../models/Vocher')
const router=express.Router();
const {ToWords}=require('to-words');
const voucher_codes = require('voucher-code-generator');
// const fetchUser = require('../middleware/fetchDetails');



const toWords = new ToWords();
const convert_to_words=(amount)=>{
    let words = toWords.convert(amount, { currency: true });
    return words;
}

const person_to_person={
    "0":"1",
    "1":"2",
    "2":"3",
    "3":"4"
}


const voucherController={
    addData:async (req,res,next)=>{
        // console.log(req.headers.id);
        const id=await voucher_codes.generate({
            length:3,
            charset:"0123456789"
        });
        const name_of_the_particulars=req.body.name_of_the_particulars;
        const person_name=req.body.person_name;
        const purpose_of_voucher=req.body.purpose_of_voucher;
        const date=req.body.date;
        const amount=req.body.amount;
        const remarks=req.body.remarks;
        const amount_in_words = await convert_to_words(amount);
        const v_id="GHWX"+id[0];
        const d={
            voucher_id:v_id,
            name_of_the_particulars:name_of_the_particulars,
            person_name:person_name,
            purpose_of_voucher:purpose_of_voucher,
            date:date,
            amount:amount,
            amount_words:amount_in_words,
            remarks:remarks,
            status:req.user._id,
            person:"0"
        }
        const voucher_exist=await Voucher.findOne({voucher_id:v_id});
        if(!voucher_exist){
            const data=await Voucher.insertMany(d);
            res.send(data);
        }
        else{
            res.send("Voucher already exists");
        }
    },


    getAllVochers:async (req,res,next)=>{
        try{
            const data=await Voucher.find();
            res.send(data);
        }
        catch (err){
            res.status(400,"Something went wrong");
        }
    },

    getVoucherById:async(req,res)=>{  // id
        let success=false;
        try{
            Voucher.find({voucher_id:req.params.id})
            .then((data)=>{
                console.log(data);
                if(data){
                    success=true;
                    res.send({data,success}); 
                }
            })
            .catch((err)=>{
                res.send({success});
            })
            
        }
    
        catch(err){
            res.status(400,"Server Busy");
        }
        
    },


    getVoucher:async(req,res,next)=>{
        let success=false;
        if(req.user){
            try {
                const req_id=req.user.id;
                const data=await Voucher.find({status:req_id});
                if(!data){
                    res.send("Data Not Found or Enter Valid Id");
                }
                success=true;
                res.send({data,success});
            } catch (error) {
                res.status(400,"Something went wrong");
            }
        }
        else{
            res.send({success});
        }
    },


    getOfficialsVochers:async(req,res)=>{
        let success=false;
        if(req.user){
            try {
                const req_id=req.user.type; //type defines the type of member
                if(req_id!="0"){
                    const data=await Voucher.find({person:req_id});
                    if(!data){
                        res.send("Data Not Found or Enter Valid Id");
                    }
                    success=true;
                    res.send({data,success});
                }
                else{
                    res.send({success});
                }
            } catch (error) {
                res.status(400,"Something went wrong");
            }
        }
        else{
            res.send({success});
        }
    },


    forwardTo:async(req,res,next)=>{ //id --> vocherid
        const success=false;
            // const details=await Voucher.findOne({voucher_id:req.params.id});
            try{
                console.log(req.user.type);
                await Voucher.updateOne({voucher_id:req.params.id},{$set:{person:person_to_person[req.user.type]}});
                res.send("Updated Successfully");
            }
            catch(err){
                res.status(400,"Something went Wrong");
            }
    },


    editVocher:async(req,res,next)=>{
        try {
            // let updateContent=
            console.log(req.body);
            var name=req.body.name_of_the_particulars;
            var person=req.body.person_name;
            var purpose_of_voucher=req.body.purpose_of_voucher;
            var dat=req.body.date;
            var amount = req.body.amount;
            var words=convert_to_words(amount);
            var remarks=req.body.remarks;

            await Voucher.updateOne({voucher_id:req.params.id},{ $set: {
                voucher_id:req.params.id,
                name_of_the_particulars:name,
                person_name:person,
                purpose_of_voucher:purpose_of_voucher,
                date:dat,
                amount:amount,
                amount_words:words,
                remarks:remarks       
            }});
            res.send("Updated Successfully");
        } catch (error) {
            res.status(400,"Server Not Working");
        }    
    },
    

    deleteVocher:async (req,res,next)=>{
        try {
            await Voucher.deleteOne({voucher_id:req.params.id})
            res.send("deleted");
            
        } catch (error) {
            res.status(400,"Error has Occured");
        }
    
    }
}

module.exports=voucherController;