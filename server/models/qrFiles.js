
const mongoose =require('mongoose')

const qrFilesSchema = new mongoose.Schema({
    image:{
        type:String,
    },
    pdf:{
        type:String,
        unique: false, 
    }
})

module.exports=mongoose.model('QrFiles',qrFilesSchema)