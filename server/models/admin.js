
const mongoose =require('mongoose')

const adminSchema = new mongoose.Schema({
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

module.exports=mongoose.model('Admin',adminSchema)