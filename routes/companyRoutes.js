const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const Company = require('../models/Company'); // Assuming you have a Company model

// Get all companies
router.get('/', verifyToken, async (req, res) => {
    try {
        const companies = await Company.find();
        res.render('companies', { companies, user: req.user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new company
router.post('/add', verifyToken, async (req, res) => {
    const { name, description } = req.body;
    const company = new Company({ name, description, sharePercentage });
    try {
        await company.save();
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit a company
router.put('/edit/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        await Company.findByIdAndUpdate(id, { name, description });
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a company
router.delete('/delete/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await Company.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
