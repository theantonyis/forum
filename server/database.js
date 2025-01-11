const { MongoClient, ServerApiVersion } = require("mongodb");
const crypto = require("crypto");

const uri = "mongodb+srv://robocode:robocode1234@cluster0.jkl6aib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db("forum");
        console.log("Connected to database.");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error; // Rethrow the error to handle it later
    }
}

// Get user by login (username)
const getUserByLogin = async (login) => {
    try {
        const user = await db.collection('users').findOne({ username: login });
        return user; // Returns user object or null if not found
    } catch (error) {
        console.error("Error getting user by login:", error);
        throw error;
    }
};

// Check if a user exists by their login
const isUserExist = async (login) => {
    const user = await getUserByLogin(login); // Using getUserByLogin
    return user !== null;
};

// Helper function to hash the password using pbkdf2
const hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

// Add a user to the database (with hashed password)
const addUser = async (user) => {
    // Generate a salt
    const salt = crypto.randomBytes(16).toString('hex');
    // Hash the password
    const passwordHash = hashPassword(user.password, salt);

    try {
        await db.collection('users').insertOne({
            username: user.login,
            password: passwordHash,
            salt: salt,
        });
        console.log(`User ${user.login} added successfully.`);
    } catch (error) {
        console.error("Error adding user:", error);
        throw error; // Throw error to be handled later
    }
};

// Validate user login and return a token if successful
const getAuthToken = async (user) => {
    try {
        const candidate = await getUserByLogin(user.login); // Using getUserByLogin
        if (!candidate) {
            throw 'Wrong login';
        }

        // Hash the entered password using the stored salt
        const hashedPassword = hashPassword(user.password, candidate.salt);

        // Compare the hashed password with the stored one
        if (candidate.password !== hashedPassword) {
            throw 'Wrong password';
        }

        // Generate a token (still using the basic method but JWT is suggested for production)
        const token = generateAuthToken(candidate._id, candidate.username);
        return token;
    } catch (error) {
        console.error("Error during authentication:", error);
        throw error; // Rethrow error for handling in the calling function
    }
};

// Generate a token (simple token generation using _id and username)
const generateAuthToken = (userId, username) => {
    const token = `${userId}.${username}.${crypto.randomBytes(20).toString('hex')}`;
    return token;
};

module.exports = {
    getUserByLogin,
    isUserExist,
    addUser,
    getAuthToken
};

// Initialize connection to the database
async function run() {
    await connectToDatabase();
}

run().catch(console.dir);
