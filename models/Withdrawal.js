const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    note: { type: String },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
