const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
        username,
        password: hashedPassword,
        role
    });

    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// User Login
// User Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Redirect to companies page and send the token
        res.cookie('token', token, { httpOnly: true }); // Store token as a cookie
        res.redirect('/companies'); // Redirect to companies page
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};