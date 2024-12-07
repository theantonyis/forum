const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./database'); // Assuming database logic is stored here
const crypto = require('crypto');

// Initialize Express
const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(express.static(path.join(__dirname, "..", 'public'))); // Serve static files from the public folder

// Static files (CSS, JS, etc.)
const indexFile = fs.readFileSync(path.join(__dirname, "..", 'public', 'index.html'));
const registerFile = fs.readFileSync(path.join(__dirname, "..", 'public', 'register.html'));
const loginFile = fs.readFileSync(path.join(__dirname, "..", 'public', 'login.html'));

// In-memory valid tokens (this should be stored securely in a real-world app)
const validAuthTokens = [];

// Routes for serving HTML pages
app.get('/register', (req, res) => {
    res.send(registerFile);
});

app.get('/login', (req, res) => {
    res.send(loginFile);
});

// Protected Route (Requires Valid Token)
app.get('/', (req, res) => {
    const credentials = getCredentials(req.cookies.token);
    if (!credentials) {
        return res.redirect('/login');
    }
    res.send(indexFile); // Render the main page if the user is authenticated
});

// Registration Endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).send('Empty login or password');
        }

        const existingUser = await db.isUserExist(login);
        if (existingUser) {
            return res.status(409).send('User already exists');
        }

        await db.addUser({ login, password }); // Assuming addUser adds the user to the database
        res.status(201).send('Registration successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error: ' + err.message);
    }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await db.getUserByLogin(login); // Get user by login
        if (!user || user.password !== password) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate auth token (for simplicity, using a random value here)
        const token = generateAuthToken(user.id, login);
        validAuthTokens.push(token);

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send(token);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error: ' + err.message);
    }
});

// Utility Functions
function generateAuthToken(userId, login) {
    const token = `${userId}.${login}.${crypto.randomBytes(16).toString('hex')}`;
    return token;
}

function getCredentials(token) {
    if (!token || !validAuthTokens.includes(token)) return null;
    const [userId, login] = token.split('.');
    return { userId, login };
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
