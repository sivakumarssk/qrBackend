const mongoose =require('mongoose')

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String },
    review: { type: String, required: true },
    link: { type: String },
    image: { type: String }
});

module.exports=mongoose.model('Testimonial',testimonialSchema)