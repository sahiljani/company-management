const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Serve registration and login views
router.get('/register', (req, res) => {
    res.render('register'); // Render register.ejs
});

router.get('/login', (req, res) => {
    res.render('login'); // Render login.ejs
});


module.exports = router;
