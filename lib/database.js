// lib/database.js
const { MongoClient, ServerApiVersion } = require("mongodb");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const uri = "mongodb+srv://robocode:robocode1234@cluster0.jkl6aib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

let db;

async function connectToDatabase() {
    if (db) return db;
    await client.connect();
    db = client.db("forum");
    return db;
}

// Get user by login
async function getUserByLogin(login) {
    const db = await connectToDatabase();
    return await db.collection('users').findOne({ username: login });
}

// Check if user exists
async function isUserExist(login) {
    const user = await getUserByLogin(login);
    return user !== null;
}

// Hash the password
async function hashPassword(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
}

// Verify the password
async function verifyPassword(enteredPassword, storedHash, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(enteredPassword, salt, 1000, 64, 'sha512', (err, derivedKey) => {
            if (err) return reject(err);
            resolve(storedHash === derivedKey.toString('hex'));
        });
    });
}

// Add a user to the database
async function addUser(user) {
    const salt = crypto.randomBytes(16).toString('hex');
    try {
        const passwordHash = await hashPassword(user.password, salt);

        const db = await connectToDatabase();
        await db.collection('users').insertOne({
            username: user.login,
            password: passwordHash,
            salt: salt,
        });
        console.log(`User ${user.login} added successfully.`);
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

// Add a discussion to the database
async function addDiss(message, userId) {
    try {
        const db = await connectToDatabase();
        const result = await db.collection('discussions').insertOne({
            content: message.content,
            title: message.title,
            author: userId,
            timestamp: new Date(),
        });

        return await db.collection('discussions').findOne({ _id: result.insertedId });
    } catch (error) {
        console.error("Error adding discussion:", error);
        throw error;
    }
}

// Get all discussions by userId
async function getDiss(userId) {
    try {
        const db = await connectToDatabase();
        return await db.collection('discussions').aggregate([
            {
                $match: { author: userId },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'authorDetails'
                }
            },
            { $unwind: '$authorDetails' },
            { $project: { content: 1, timestamp: 1, 'authorDetails.username': 1 } }
        ]).toArray();
    } catch (error) {
        console.error('Error fetching discussions:', error);
        throw error;
    }
}

// Generate JWT
const generateAuthToken = (userId, username) => {
    const payload = { userId, username };
    const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Make sure to store this in env file
    const options = { expiresIn: '1h' }; // Set token expiration

    return jwt.sign(payload, secret, options);
};

// Verify JWT
const verifyAuthToken = (token) => {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Make sure to store this in env file
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = {
    connectToDatabase,
    getUserByLogin,
    isUserExist,
    addUser,
    addDiss,
    getDiss,
    generateAuthToken,
    verifyAuthToken,
    verifyPassword
};
