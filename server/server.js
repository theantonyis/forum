const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./database'); // Assuming database logic is stored here
const cors = require('cors');
const au = require("../src/middleware/auth");

// Initialize Express
const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,  // Allow cookies to be sent with requests
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(express.static(path.join(__dirname, "..", 'public'))); // Serve static files from the public folder

// Static files (CSS, JS, etc.)
const indexFile = fs.readFileSync(path.join(__dirname, "..", 'index.html'));

//Protected Route (Requires Valid Token)
app.get('/', (req, res) => {
    const credentials = au.getCredentials(req.cookies.token);
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

        if (!user) {
            return res.status(401).send('Invalid username');
        }

        // Verify the password by comparing the stored hash with the input password hash
        const isPasswordValid = await db.verifyPassword(password, user.password, user.salt);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }

        // Generate auth token (for simplicity, using a random value here)
        const token = au.generateAuthToken(user._id, login);

        // Set token in cookie
        res.status(200).json({ token });  // Sending token in response body
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error: ' + err.message);
    }
});

app.get('api/discussions', async (req, res) => {
    try {
        const discussions = await db.getDiss();
        res.status(200).json(discussions);  // Return the discussions as the response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch discussions' });
    }
});

app.post('/api/addDiss', au.authToken,async (req, res) => {
    const { content, title } = req.body;
    const { username, userId } = req.user;

    if (!username) {
        return res.status(401).json({ error: 'You must be logged in to create a discussion' });
    }

    try {
        // Add the new message/discussion, including the user's ID as the author
        const newDiscussion = await db.addDiss({ content, title }, userId);
        res.status(200).json({ message: 'CreateDiscussion created successfully!' });
    } catch (error) {
        console.error("Error creating discussion:", error);
        res.status(500).json({ error: 'Failed to create discussion' });
    }
});

// app.post('/api/addMessage', async (req, res) => {
//     try {
//         const { content, author } = req.body;
//
//         if (!content || !author) {
//             return res.status(400).send('Content or author is missing');
//         }
//
//         // Call addMessage to insert the message into the database
//         await db.addMessage({ content, author });
//
//         res.status(201).send('Message added successfully');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error: ' + err.message);
//     }
// });

// // Route to get all messages
// app.get('/api/messages', async (req, res) => {
//     try {
//         const messages = await db.getMessages(); // Using the getMessages function
//         res.status(200).json(messages);
//     } catch (error) {
//         console.error('Error fetching messages:', error);
//         res.status(500).json({ message: 'Failed to fetch messages' });
//     }
// });


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
