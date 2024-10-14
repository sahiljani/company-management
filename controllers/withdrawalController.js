const Withdrawal = require('../models/Withdrawal');

// Create a new withdrawal
exports.createWithdrawal = async (req, res) => {
    try {
        const withdrawal = new Withdrawal(req.body);
        await withdrawal.save();
        res.status(201).json(withdrawal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all withdrawals
exports.getWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Withdrawal.find().populate('member').populate('company');
        res.render('withdrawals', { withdrawals });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a withdrawal
exports.updateWithdrawal = async (req, res) => {
    try {
        const withdrawal = await Withdrawal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(withdrawal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a withdrawal
exports.deleteWithdrawal = async (req, res) => {
    try {
        await Withdrawal.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
