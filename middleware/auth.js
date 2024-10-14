const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // Check for token in cookies
    const token = req.cookies.token; // Retrieve token from cookies
    if (!token) return res.status(403).send('A token is required for authentication');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send('Invalid Token');
        req.user = user; // Attach user data to request object
        next(); // Proceed to the next middleware or route handler
    });
};
