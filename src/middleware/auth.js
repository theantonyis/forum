const jwt = require('jsonwebtoken');  // Use jsonwebtoken for decoding (or use your own logic if different)

const authToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ error: 'Token is required' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, 'your-secret-key');  // Replace with your secret key

        // Attach the decoded token data (e.g., username) to the request object
        req.user = { username: decoded.username };  // Assuming the token contains the username

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { authToken };
