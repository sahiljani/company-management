const Member = require('../models/Member');

// Create a new member
exports.createMember = async (req, res) => {
    try {
        const member = new Member(req.body);
        await member.save();
        res.status(201).json(member);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all members
exports.getMembers = async (req, res) => {
    try {
        const members = await Member.find().populate('company');
        res.render('members', { members });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a member
exports.updateMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(member);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a member
exports.deleteMember = async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
