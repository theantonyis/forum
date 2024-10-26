const fs = require("fs");
const crypto = require("crypto");
const {MongoClient, ServerApiVersion} = require("mongodb");
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

const isUserExist = async (login) => {
    const user = await db.collection('users').findOne({ username: login });
    return user !== null;
};

const addUser = async (user) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const password = crypto.pbkdf2Sync(user.password, salt, 1000, 64, 'sha512').toString('hex');

    await db.collection('users').insertOne({
        username: user.login,
        password: password,
        salt: salt
    });
};

async function run() {
    await connectToDatabase();

    module.exports = {
        isUserExist,
        addUser
    };
}
run().catch(console.dir);