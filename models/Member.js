const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    sharePercentage: { type: Number, required: true }
});

module.exports = mongoose.model('Member', memberSchema);
