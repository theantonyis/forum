const fs = require("fs"); // library fs
const crypto = require("crypto");
const {MongoClient, ServerApiVersion} = require("mongodb");
const uri = "mongodb+srv://antony:robocode1234@cluster0.jkl6aib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const db = client.db("forum");

        module.exports = {
            isUserExist: async (login) => {
                const user = await db.collection('users').findOne({username: login});
                return user !== null;
            },
            addUser: async (user) => {
                const salt = crypto.randomBytes(16).toString('hex');
                const password = crypto.pbkdf2Sync(user.password, salt, 1000, 64, 'sha512').toString('hex');

                await db.collection('users').insertOne({
                    username: user.login,
                    password: password,
                    salt: salt
                });
            }
        };
    } finally {
        await client.close();
    }
}
run().catch(console.dir);