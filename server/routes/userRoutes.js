const express = require('express');
const router=express.Router()

const userControler=require('../controlers/userLoginControler');
const { uploadqrFilesFiles } = require('../controlers/qrFilesControler');
const { uploadTestimonial, deleteTestmonials, getTestmonials } = require('../controlers/testimonialsControler');

router.post('/register', userControler.registerUser)
router.post('/login', userControler.loginUser)
router.get('/users',userControler.getUsers)

router.post('/qrfiles', uploadqrFilesFiles)

router.post("/upload-testimonial",uploadTestimonial)
router.delete("/testimonial/:id",deleteTestmonials)
router.get("/testimonials",getTestmonials)


module.exports=router