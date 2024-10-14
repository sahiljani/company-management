const Expense = require('../models/Expense');

// Create a new expense
exports.createExpense = async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('member').populate('company');
        res.render('expenses', { expenses });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an expense
exports.updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(expense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
