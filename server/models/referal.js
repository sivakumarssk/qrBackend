
const mongoose =require('mongoose')

const referalSchema = new mongoose.Schema({
    user:{
        type:String,
    },
    referal:{
        type:String,
    },
    type:{
        type:String,
    }
})

module.exports=mongoose.model('Referal',referalSchema)