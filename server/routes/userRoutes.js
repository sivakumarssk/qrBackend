const express = require('express');
const router=express.Router()

const userControler=require('../controlers/userLoginControler');
const { uploadqrFilesFiles } = require('../controlers/qrFilesControler');
const { uploadTestimonial, deleteTestmonials, getTestmonials } = require('../controlers/testimonialsControler');
const { getCounts, incrementCount } = require('../controlers/countControllerController');
const { uploadCardsBackground, getCardsBackground, deleteCardsBackground, deleteSingleImage } = require('../controlers/cardsBackController');
const { getPrice, updatePrice } = require('../controlers/priceController');
const { createReferal, getReferals } = require('../controlers/referalController');
const { registerAdmin, loginAdmin } = require('../controlers/adminLoginControler');


router.post('/registerAdmin', registerAdmin)
router.post('/loginAdmin', loginAdmin)

router.post('/register', userControler.registerUser)
router.post('/login', userControler.loginUser)
router.get('/users',userControler.getUsers)

router.post('/qrfiles', uploadqrFilesFiles)

router.post("/upload-testimonial",uploadTestimonial)
router.delete("/testimonial/:id",deleteTestmonials)
router.get("/testimonials",getTestmonials)


router.get('/getCounts', getCounts);
router.post('/incrementCount', incrementCount);

router.post('/upload',uploadCardsBackground);
router.get('/cardsBackground', getCardsBackground);
router.delete('/deleteCardsBackground/:id',deleteCardsBackground);
router.delete('/deleteCardsBackgroundImage/:id', deleteSingleImage);

router.get('/getPrice',getPrice);
router.post('/addPrice', updatePrice);

router.get('/referals',getReferals);
router.post('/addreferals', createReferal);

module.exports=router