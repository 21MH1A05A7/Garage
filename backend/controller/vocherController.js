const express=require('express');
const bcrypt=require('bcryptjs');
const User = require('../models/User');
const UserApi = require('../controller/userController');
const Voucher=require('../models/Vocher')
const router=express.Router();
const {ToWords}=require('to-words');
const voucher_codes = require('voucher-code-generator');
const Gm = require('../models/Gm');
const Acao = require('../models/Acao');
const Vc = require('../models/Vc');
const Cashier = require('../models/Cashier');
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
        // console.log(req.body);
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
        const image=req.body.image;
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
            person:"0",
            image:image
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


    getAllGmVochers:async (req,res,next)=>{
        try{
            const data=await Gm.find();
            res.send(data);
        }
        catch (err){
            res.status(400,"Something went wrong");
        }
    },
    
    getAllAcaoVochers:async (req,res,next)=>{
        try{
            const data=await Acao.find();
            res.send(data);
        }
        catch (err){
            res.status(400,"Something went wrong");
        }
    },
    getAllVcVochers:async (req,res,next)=>{
        try{
            const data=await Vc.find();
            res.send(data);
        }
        catch (err){
            res.status(400,"Something went wrong");
        }
    },
    getAllCashierVochers:async (req,res,next)=>{
        try{
            const data=await Cashier.find();
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
                const user=data[0].status.toString();
                if(user===req.user.id){
                    if(data.length>0){
                        success=true;
                        res.send({data,success}); 
                    }
                    else{
                        res.send({success});
                    }
                }
                else{
                    res.send({success});
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

    getGmVoucherById:async(req,res)=>{
        let success=false;
        try{
            Gm.find({voucher_id:req.params.id})
            .then((data)=>{
                    if(data.length>0){
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
        }
        catch(err){
            res.status(400,"Server Busy");
        }
    },
    getAcaoVoucherById:async(req,res)=>{
        let success=false;
        try{
            Acao.find({voucher_id:req.params.id})
            .then((data)=>{
                    if(data.length>0){
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
        }
        catch(err){
            res.status(400,"Server Busy");
        }
    },

    getVcVoucherById:async(req,res)=>{
        let success=false;
        try{
            Vc.find({voucher_id:req.params.id})
            .then((data)=>{
                    if(data.length>0){
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
                // console.log(req_id);
                if(req_id!='0'){
                    // console.log(req_id);
                    const data=await Voucher.find({person:req_id});
                    console.log(data);
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
        console.log(req.headers.id);
        let success=false;
            // const details=await Voucher.findOne({voucher_id:req.params.id});
            try{
                await Voucher.updateOne({voucher_id:req.params.id},{$set:{person:person_to_person[req.user.type]}});
                await Voucher.findOne({voucher_id:req.params.id})
                .then(async (result)=>{
                    if(result.person==='1'){
                        await Gm.insertMany(result)
                        .then((data)=>{
                            success=true;
                            res.send({data,success});
                        })
                        .catch((err)=>{
                        // console.log(err);
                            res.status(400,"Something went wrong");
                        })    
                    }
                    else if(result.person==='2'){
                        await Gm.updateOne({voucher_id:req.params.id},{$set:{person:person_to_person[req.user.type]}});
                        const data=await Acao.insertMany(result)
                        if(data){
                            success=true;
                            res.send({data,success});
                        }
                        else{
                            res.status(400,"sjkasdf");
                        }
                    }
                    else if(result.person==='3'){
                        await Gm.updateOne({voucher_id:req.params.id},{$set:{person:person_to_person[req.user.type]}});
                        await Acao.updateOne({voucher_id:req.params.id},{$set:{person:person_to_person[req.user.type]}});
                        const data=await Vc.insertMany(result)
                        if(data){
                            success=true;
                            res.send({data,success});
                        }
                        else{
                            res.status(400,"sjkasdf");
                        }
                    }
                    else{
                        // await Vc.insertMany(result)
                        const date=new Date();
                        const day=date.getDate();
                        const month=date.getMonth()+1;
                        const year=date.getFullYear();
                        const str=day+"/"+month+"/"+year;
                        await Gm.updateOne({voucher_id:req.params.id},{$set:{person:person_to_person[req.user.type]}});
                        await Acao.updateOne({voucher_id:req.params.id},{$set:{person:person_to_person[req.user.type]}});
                        await Vc.updateOne({voucher_id:req.params.id},{$set:{person:person_to_person[req.user.type]}});
                        result.payment_instruction_received=str;
                        const data=await Cashier.insertMany(result)
                        if(data){
                            success=true;
                            res.send({data,success});
                        }
                        else{
                            res.status(400,"sjkasdf");
                        }
                    }
                    
                })
            }
            catch(err){
                res.status(400,"Something went Wrong");
            }
    },


    editVocher:async(req,res,next)=>{
        const success=true;
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
            var image=req.body.image;
            console.log(image);

            await Voucher.updateOne({voucher_id:req.params.id},{ $set: {
                voucher_id:req.params.id,
                name_of_the_particulars:name,
                person_name:person,
                purpose_of_voucher:purpose_of_voucher,
                date:dat,
                amount:amount,
                amount_words:words,
                remarks:remarks,
                image:image     
            }});
            res.send(success);
        } catch (error) {
            res.status(400,"Server Not Working");
        }    
    },
    

    deleteVocher:async (req,res,next)=>{
        try {
            await Voucher.deleteOne({voucher_id:req.params.id})
            .then(async (result)=>{
                let success='false';
                if(req.user){
                    try {
                        const req_id=req.user.id;
                        const data=await Voucher.find({status:req_id});
                        console.log(data);
                        if(!data){
                            return res.send("Data Not Found or Enter Valid Id");
                        }
                        success='true';
                        return res.send({data,success});
                    } catch (error) {
                        res.status(400,"Something went wrong");
                    }
                }
                else{
                    res.send({success});
                }
            })

            .catch((err)=>{

            })

        } catch (error) {
            res.status(400,"Error has Occured");
        }
    
    },
    setPaidOn:async(req,res)=>{
        const date=req.body.date;

        await Cashier.updateOne({voucher_id:req.params.id},{$set:{paid_on:date}});
        const data=await Cashier.find();
        if(data){
            // console.log(data);
            res.send(data);
        }
        else{
            console.log("Error has Occured");
        }
    }

}


module.exports=voucherController;