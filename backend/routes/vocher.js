const express=require('express');
const bcrypt=require('bcryptjs');
const User = require('../models/User');
const UserApi = require('../controller/userController');
const Voucher=require('../models/Vocher')
const router=express.Router();
const {ToWords}=require('to-words');
const voucher_codes = require('voucher-code-generator');
const fetchUser = require('../middleware/fetchDetails');
const voucherController=require('../controller/vocherController');


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

const reverse={
    "1":"0"
}
//addVocher /////  Create a Voucher
router.post('/addData',fetchUser,voucherController.addData);

// Get ALL Vouchers 
router.get('/getAllGmVochers',voucherController.getAllGmVochers);

router.get('/getAllVcVochers',voucherController.getAllVcVochers);

router.get('/getAllAcaoVochers',voucherController.getAllAcaoVochers);


router.get('/getAllCashierVochers',voucherController.getAllCashierVochers);
// router.get('/getAllCashierVochers',voucherController.getAllCashierVochers);

// router.post('/officialVochers',fetchUser,async(req,res,next)=>{

// })

//get user by vocher_id
//write
router.get('/getVocherId/:id',fetchUser,voucherController.getVoucherById);

router.get('/getGmVocherId/:id',fetchUser,voucherController.getGmVoucherById);

router.get('/getAcaoVocherId/:id',fetchUser,voucherController.getAcaoVoucherById);

router.get('/getVcVocherId/:id',fetchUser,voucherController.getVcVoucherById);


// get vochers of a particular garage staff member
router.get('/getVochers',fetchUser,voucherController.getVoucher); 

//officials information fetching
router.get('/officialsVocher',fetchUser,voucherController.getOfficialsVochers);

//Forward to GM , VC , ACOA, Cashier
router.put('/forwardto/:id',fetchUser,voucherController.forwardTo);

router.put('/editVocher/:id',fetchUser,voucherController.editVocher);


//delete a particular voucher
router.delete('/deleteVoucher/:id',fetchUser,voucherController.deleteVocher);

router.put('/setpaidOn/:id',fetchUser,voucherController.setPaidOn);

module.exports=router;


// {
//     "name_of_the_particulars":"Bus Tyre",
//     "person_name":"Govind",
//     "purpose_of_voucher":"punchutered Tyre",
//     "date":"15-3-2024",
//     "amount":"2000",
//     "remarks":"no"
// }