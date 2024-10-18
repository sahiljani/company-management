const Member = require('../models/Member');
const Company = require('../models/Company');
// Create a new member
exports.createMember = async (req, res) => {
    try {
        const { name, company, sharePercentage } = req.body;

        // Validate input
        if (!name || !company || sharePercentage === undefined) {
            return res.status(400).json({ success: false, message: 'Name, company, and share percentage are required.' });
        }

        // Log the received values for debugging
        console.log('Received values:', { name, company, sharePercentage });

        // Create a new member
        const newMember = new Member({ name, company, sharePercentage });
        await newMember.save();

        return res.json({ success: true, message: 'Member added successfully' });
    } catch (error) {
        console.error('Error adding member:', error);
        return res.status(500).json({ success: false, message: 'Error adding member' });
    }
};

// Get all members
exports.getMembers = async (req, res) => {
    try {
        const members = await Member.find().populate('company'); // Assuming Member is your member model
        const companies = await Company.find(); // Fetch all companies

        res.render('members', { members, companies }); // Pass both members and companies to the view
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
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
