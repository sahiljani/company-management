const Income = require('../models/Income');

// Create a new income
exports.createIncome = async (req, res) => {
    try {
        const income = new Income(req.body);
        await income.save();
        res.status(201).json(income);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all incomes
exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().populate('member').populate('company');
        res.render('incomes', { incomes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an income
exports.updateIncome = async (req, res) => {
    try {
        const income = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(income);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete an income
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
