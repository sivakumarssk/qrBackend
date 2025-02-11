const express = require('express');
const router=express.Router()
const Razorpay = require("razorpay");

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

const razorpay = new Razorpay({
    key_id: "rzp_live_HJLLQQPlyQFOGr",
    key_secret: "cm2v1OSggPZ5vVHX5rl3jrq4",
  });
  
  // Create order endpoint
  router.post("/create-order", async (req, res) => {
    try {
      const { amount, currency } = req.body;
  
      const options = {
        amount: amount * 100, // Convert to paise
        currency,
        receipt: `receipt_${Math.random().toString(36).substring(2, 15)}`,
      };
  
      const order = await razorpay.orders.create(options);
      res.json({ orderId: order.id, amount: order.amount });
    } catch (error) {
      res.status(500).json({ error: "Failed to create order", details: error });
    }
  });
  

module.exports=router