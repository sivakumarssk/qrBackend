
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
}, { timestamps: true })

module.exports=mongoose.model('Referal',referalSchema)