const Testimonial = require('../models/testimonialsSchema')
const filehandle = require('../middleware/filehandle');

const uploadTestimonial =async(req,res)=>{
    try {
        let imageUrl = null;
        if (req.files) {
             imageUrl = await filehandle.uploadFile(req.files.image, 'qrFiles');
        }

        const { name, role, review, link } = req.body;

        if (!name || !review) {
            return res.status(400).json({ message: "Name and review are required." });
        }

        const newTestimonial = new Testimonial({
            name,
            role,
            review,
            link,
            image: imageUrl,
        });

        await newTestimonial.save();
        return res.status(201).json({ message: "Testimonial uploaded successfully", testimonial: newTestimonial });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


const getTestmonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        return res.status(200).json(testimonials);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteTestmonials =async(req,res) =>{
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findByIdAndDelete(id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        return res.status(200).json({ message: "Testimonial deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
} 

module.exports = { uploadTestimonial,getTestmonials,deleteTestmonials };
