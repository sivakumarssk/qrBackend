// controllers/cardsBackgroundController.js
const CardsBackground = require('../models/cardsBackground');
const filehandle = require('../middleware/filehandle');

/**
 * Upload one or more images to the cardsBackground.
 * If a document exists, new images are appended; otherwise, a new document is created.
 */
const uploadCardsBackground = async (req, res) => {
  try {
    let imageUrls = [];

    // Check if files were uploaded under the "images" field
    if (req.files && req.files.images) {
      // Ensure that req.files.images is an array
      const images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      // Process each image using the filehandle.uploadFile helper
      for (const file of images) {
        const url = await filehandle.uploadFile(file, 'cardsBackgroundfiles');
        imageUrls.push(url);
      }
    } else {
      return res.status(400).json({ message: 'No images provided.' });
    }

    // Try to find an existing cardsBackground document
    let cardsBackground = await CardsBackground.findOne();

    if (cardsBackground) {
      // Append new image URLs to the existing array
      cardsBackground.image = cardsBackground.image.concat(imageUrls);
    } else {
      // No document exists, so create a new one
      cardsBackground = new CardsBackground({
        image: imageUrls
      });
    }

    await cardsBackground.save();
    return res.status(201).json({
      message: 'Cards background updated successfully.',
      data: cardsBackground
    });
  } catch (error) {
    console.error('Error uploading cards background:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get the cards background document.
 */
const getCardsBackground = async (req, res) => {
  try {
    const cardsBackground = await CardsBackground.findOne();
    return res.status(200).json(cardsBackground);
  } catch (error) {
    console.error('Error retrieving cards background:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Delete the cards background document by its ID.
 */
const deleteCardsBackground = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Find the document by its ID
      const document = await CardsBackground.findById(id);
      if (!document) {
        return res.status(404).json({ message: 'Document not found.' });
      }
  
      // Delete each file referenced in the image array
      if (document.image && document.image.length > 0) {
        for (const filePath of document.image) {
          await filehandle.deleteFile(filePath);
        }
      }
  
      // Delete the document from the database
      await CardsBackground.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Document and associated files deleted successfully.' });
    } catch (error) {
      console.error('Error deleting document:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const deleteSingleImage = async (req, res) => {
    try {
      const { id } = req.params;
      const { imageUrl } = req.body;
  
      if (!imageUrl) {
        return res.status(400).json({ message: "Image URL is required." });
      }
  
      // Find the document by its ID
      const document = await CardsBackground.findById(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found." });
      }
  
      // Check if the image exists in the document
      if (!document.image.includes(imageUrl)) {
        return res.status(404).json({ message: "Image not found in document." });
      }
  
      // Remove the image URL from the document's image array
      document.image = document.image.filter((img) => img !== imageUrl);
      await document.save();
  
      // Delete the physical file from disk
      await filehandle.deleteFile(imageUrl);
  
      return res.status(200).json({ message: "Image deleted successfully.", data: document });
    } catch (error) {
      console.error("Error deleting image:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

module.exports = {
  uploadCardsBackground,
  getCardsBackground,
  deleteCardsBackground,
  deleteSingleImage
};
