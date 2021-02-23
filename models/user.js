const { string, number } = require('joi');
const Joi=require('joi')

const mongoose=require('mongoose');
const mongooseToCsv=require('mongoose-to-csv')


const userschema=new mongoose.Schema({
    cable_id:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        uppercase:true
          },
        Name:{
            type:String,
            trim:true,
            required:true,
            uppercase:true,
            
        },
        Price:{
            type:Number,
            required:true,
            default:0
        
        }
})

userschema.plugin(mongooseToCsv, {
    headers: 'cable_id Name Price',
    constraints: {
      'cable_id': 'cable_id',
      'Name': 'Name',
      'Price': 'Price'
    }});


const User=mongoose.model('User',userschema);





function validate(user){

    user.cable_id.replace(/\s/g, '')
    user.username.replace(/\s/g, '')
    const schema=Joi.object({
    cable_id:Joi.string().trim().alphanum()
    .min(7)
    .required() ,
    
    username:Joi.string().trim().required(),
    
    price:Joi.number().min(200).max(500).positive().required()
    
    })
    
    return schema.validate(user,{ abortEarly: false })
    
    }



    exports.User=User
    exports.validate=validate