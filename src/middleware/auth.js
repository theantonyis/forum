const jwt = require('jsonwebtoken');  // Use jsonwebtoken for decoding (or use your own logic if different)

const secretKey = '3ee88e52edc7ee39edb9947a31929d670167588a60481cacaa62c97e1f9e08c915332c0106eb49329a5de6211967dcfe061355094372bb94fc1c4732c0a109fe494503f1978f2bc68e002f518f95bb217720df3fe1912555447eb33f841471d45456eeb464d067c199949f50c56e2c37e42f0c4e9d20c06cea1209f20445eb0f0583f5d30cf8f9bcf488ac705e6cd3635d64b29bc0e5642100e354241744e3395a24c9461498bd494094e239b896a2e4139c6053051560c6dfee6d583b5acd8685f74c4f0e64b4f1774e9f552cbd483ffe2350612ae465dbd4bef5b7150b7cf83c6c4afe8c47fdf3f6db29443e95d59286fc319a3f30d730a9cbd25f324986ee';

const generateAuthToken = (userId, username) => {
    const payload = { userId, username };  // Payload can include userId and username
    const options = { expiresIn: '1h' };   // Token will expire in 1 hour

    return jwt.sign(payload, secretKey, options);  // Generate and return JWT
};

const authToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    console.log('Received token:', token);

    if (!token) {
        return res.status(403).json({ error: 'Token is required' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, secretKey);  // Replace with your secret key

        // Attach the decoded token data (e.g., username) to the request object
        req.user = { userId: decoded.userId, username: decoded.username };  // Assuming the token contains the username

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

function getCredentials(token) {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, secretKey); // Validate token and get user details
        return { userId: decoded.userId, login: decoded.username }; // Return user credentials from token
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateAuthToken,
    authToken,
    getCredentials
};
