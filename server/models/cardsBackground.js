
const mongoose =require('mongoose')

const cardsBackgroundSchema = new mongoose.Schema({
    image:[string]
})

module.exports=mongoose.model('cardsBackground',cardsBackgroundSchema)