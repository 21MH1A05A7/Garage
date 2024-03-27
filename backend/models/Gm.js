const mongoose= require('mongoose');
const User = require('./User');
const {Schema}=mongoose;

let generate_voucher = mongoose.Schema({
    voucher_id:{
        type:String,
        required:true
    },
    name_of_the_particulars:{
        type:String,
        required:true
    },
    person_name:{
        type:String,
        required:true
    },
    purpose_of_voucher:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    amount_words:{
        type:String,
        required:true
    },
    remarks:{
        type:String,
        required:true
    },
    status:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true
    },
    person:{
        type:String,
        required:true
    },
    payment_instruction_received:{
        type:String
    },
    paid_on:{
        type:String
    },
    image:{
        type:String
    }
});

module.exports = mongoose.model("Gm_voucher",generate_voucher);