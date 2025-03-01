const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    totalpriceQR: { type: Number, default: 0 },
    dicountpriceQR: { type: Number, default: 0 },
    totalpricePersonal: { type: Number, default: 0 },
    dicountpricePersonal: { type: Number, default: 0 },
    totalpriceBusiness: { type: Number, default: 0 },
    dicountpriceBusiness: { type: Number, default: 0 },
    totalpriceResume: { type: Number, default: 0 },
    dicountpriceResume: { type: Number, default: 0 },
    totalpriceBio: { type: Number, default: 0 },
    dicountpriceBio: { type: Number, default: 0 },
    totalpriceInvitation: { type: Number, default: 0 },
    dicountpriceInvitation: { type: Number, default: 0 },
    totalpriceProperty: { type: Number, default: 0 },
    dicountpriceProperty: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Price', PriceSchema);
