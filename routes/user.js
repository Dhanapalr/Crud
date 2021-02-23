const express=require('express')
const { unregisterDecorator } = require('handlebars')
const router=express.Router()
const Joi=require('joi')
const {User,validate}=require('../models/user')
router.get('/',(req,res)=>{
res.render('index',{
    Title:"Home",
    Error:"No error",
    display:"none"
})
})

router.post('/register',async(req,res)=>{
   let {cable_id,username,price}=req.body
   cable_id=cable_id.replace(/\s/g, '')
   username=username.replace(/\s/g, '')
    let resulterror=[]
    
    const { error } = validate(req.body)
                   if(error){
                error.details.map(e=>{
                    resulterror.push (e.message)
                
                })
                      return   res.render('index',{
                                 Error:resulterror,
                                 Title: "Home",
                                 cable_id:cable_id,
                                 username:username,
                                  price:price,
                                  display:"none"
                                  })
      
                     }
  try{     
                  
                 const isuser=await User.find({cable_id})
                 
                  if(isuser.length>0){
                                return  res.render('index',{
                                         Error:["User Already Exist"],
                                          Title: "Home",
                                        cable_id:cable_id,
                                      username:username,
                                       price:price,
                                       display:"none"
                                              })
                          }
 const user=new User({cable_id,Name:username,Price:price})

  const result=await user.save()

  res.render('index',{
      Error:["Succesfully added"],
      data:[ result.cable_id , result.Name , result.Price],
      display:"block"

  })

                }catch(e){
                     console.log(e)
                 }

})



router.get('/update',async(req,res)=>{

if(!req.query.cable_id)
{
  return   res.render('update',{ Error:['Please enter user Id'],display:"block",dispupdate:"none",Title:'Update'})
}

let cable_id=req.query.cable_id
cable_id=cable_id.replace(/\s/g, '')


try{
    const user=await User.findOne({cable_id})
    if(!user){
        return   res.render('update',{ Error:['Please enter Valid Id'],dispupdate:"none",Title:'Update',display:'block'})
    }

    res.render('update',{ Error:['User Found'],disupdate:"block",display:"none",Title:'Update',cable_id:user.cable_id,price:user.Price,username:user.Name})
    


}catch(e){
console.log(e)
}


})


router.post('/updateuser',async(req,res)=>{

let {cable_id, username, price}= req.body
cable_id=cable_id.replace(/\s/g, '')
username=username.replace(/\s/g, '')

var resulterror=[]
   
const { error } = validate(req.body)

               if(error){
            error.details.map(e=>{
                resulterror.push (e.message)
            
            })
           
                  return   res.render('update',{
                             Error:resulterror,
                             Title: "update",
                             cable_id:cable_id,
                             username:username,
                              price:Price,
                              display:"none",
                              dispupdate:"block"
                              })
                              
  
                 }
try{
       const result=await User.findOneAndUpdate(cable_id,{
            $set:{Name:username,Price:price}
    },{new:true})

    res.render('update',{ Error:['User Updated Succesfully'],dispupdate:"none",Title:'Update',display:'block'})

}catch(e){

    console.log(e)
}

})



router.get('/delete',async(req,res)=>{

    if(!req.query.cable_id)
    {
      return   res.render('delete',{ Error:['Please enter user Id'],display:"block",dispupdate:"none",Title:'Delete'})
    }
    
    let cable_id=req.query.cable_id
    cable_id=cable_id.replace(/\s/g, '')
    
    
    try{
        const user=await User.findOne({cable_id})
        if(!user){
            return   res.render('delete',{ Error:['Please enter Valid Id'],dispupdate:"none",Title:'Update',display:'block'})
        }
    
        res.render('delete',{ Error:['User Found'],disupdate:"block",display:"none",Title:'Update',cable_id:user.cable_id,price:user.Price,username:user.Name})
        
    
    
    }catch(e){
    console.log(e)
    }
    

})




router.post('/deleteuser',async(req,res)=>{

    const {cable_id}= req.body
   console.log(cable_id)
 
    try{
           const result=await User.findOneAndDelete({cable_id})
           console.log(result)
   // res.statussend("successfully deleted")
  return  res.status(200).send(cable_id)
      //  res.render('delete',{ Error:['User deleted Succesfully'],dispupdate:"none",Title:'Update',display:'block'})
    
    }catch(e){
     return   res.status(404).send("not deleted")
       // console.log(e)
    }
    
    })

    router.get('/alluser',async (req,res)=>{
     
        try{
            const result=await User.find({});
     console.log(result)
     res.send(result)
         //res.render('delete',{ Error:['User deleted Succesfully'],dispupdate:"none",Title:'Update',display:'block'})
     
     }catch(e){
     
         console.log(e)
     }

    })

module.exports=router