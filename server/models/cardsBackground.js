// models/cardsBackground.js
const mongoose = require('mongoose');

const cardsBackgroundSchema = new mongoose.Schema({
  image: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('cardsBackground', cardsBackgroundSchema);
