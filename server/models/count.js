const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
    users: { type: Number, default: 0 },
    totalQR: { type: Number, default: 0 },
    dailyQR: { type: Number, default: 0 },
    totalPersonal: { type: Number, default: 0 },
    dailyPersonal: { type: Number, default: 0 },
    totalBusiness: { type: Number, default: 0 },
    dailyBusiness: { type: Number, default: 0 },
    totalResume: { type: Number, default: 0 },
    dailyResume: { type: Number, default: 0 },
    totalBio: { type: Number, default: 0 },
    dailyBio: { type: Number, default: 0 },
    totalInvitation: { type: Number, default: 0 },
    dailyInvitation: { type: Number, default: 0 },
    totalProperty: { type: Number, default: 0 },
    dailyProperty: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Count', countSchema);
