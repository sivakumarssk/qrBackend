
const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        requied:true
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        requied:true
    },
})

module.exports=mongoose.model('User',userSchema)