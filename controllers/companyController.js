const Company = require('../models/Company');

// Create a new company
exports.createCompany = async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json(company);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all companies
exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate('members');
        res.render('companies', { companies });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a company
exports.updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(company);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
