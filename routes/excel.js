const fs=require('fs')
const path=require('path')
const express=require('express')
const router=express.Router()
const {User,validate}=require('../models/user')

router.get('/',async(req,res)=>{
const filename='Customer.csv'
try{ 
       User.find({}).exec()
        .then(async function(docs) {
         await User.csvReadStream(docs)
            .pipe(fs.createWriteStream('./downloaded/Customer.csv'));
        });
    await User.countDocuments({},(err,res)=>{
    console.log(res)})



res.download('./downloaded/Customer.csv',function(error){ 
    console.log("Error : ", error) 
   
});}catch(e)
{
    console.log(e)
}

   

})


module.exports=router

