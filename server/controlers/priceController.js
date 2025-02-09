// controllers/PriceController.js
const Price = require('../models/price');


const getPrice = async (req, res) => {
  try {
    const priceData = await Price.findOne();
    return res.status(200).json(priceData);
  } catch (error) {
    console.error("Error retrieving Price:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const updatePrice = async (req, res) => {
  try {
    await Price.deleteMany({});
    
    const newPrice = new Price(req.body);
    await newPrice.save();

    return res.status(201).json({
      message: "Price updated successfully",
      data: newPrice,
    });
  } catch (error) {
    console.error("Error updating Price:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getPrice, updatePrice };
