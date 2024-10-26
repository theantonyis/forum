const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./database');
const cookie = require('cookie');

const validAuthTokens = [];

const indexHtmlFile = fs.readFileSync(path.join(__dirname, 'static', 'index.html'));
// const scriptFile = fs.readFileSync(path.join(__dirname, 'static', 'script.js'));
const authFile = fs.readFileSync(path.join(__dirname, 'static', 'auth.js'));
const styleFile = fs.readFileSync(path.join(__dirname, 'static', 'style.css'));
const registerFile = fs.readFileSync(path.join(__dirname, 'static', 'register.html'));
// const loginFile = fs.readFileSync(path.join(__dirname, 'static', 'login.html'));

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        switch (req.url) {
            case '/register':
                return res.end(registerFile);
            // case '/login': return res.end(loginFile);
            case '/auth.js':
                return res.end(authFile);
            case '/style.css':
                return res.end(styleFile);
            default:
                return guarded(req, res);
        }
    }
    if (req.method === 'POST') {
        switch (req.url) {
            case '/api/register':
                return registerUser(req, res);
            // case '/api/login':
            //     return login(req, res);
            default:
                return guarded(req, res);
        }
    }
});

function guarded(req, res) {
    const credentionals = getCredentionals(req.headers?.cookie);
    if (!credentionals) {
        res.writeHead(302, {'Location': '/register'});
        return res.end();
    }
    if (req.method === 'GET') {
        switch (req.url) {
            case '/':
                return res.end(indexHtmlFile);
            // case '/script.js':
            //     return res.end(scriptFile);
        }
    }
    res.writeHead(404);
    return res.end('Error 404');
}

function getCredentionals(c = '') {
    const cookies = cookie.parse(c);
    const token = cookies?.token;
    if (!token || !validAuthTokens.includes(token)) return null;
    const [user_id, login] = token.split('.');
    if (!user_id || !login) return null;
    return {user_id, login};
}

async function registerUser(req, res) {
    let data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', async function () {
        try {
            const user = JSON.parse(data);
            console.log(user);

            if (!user.login || !user.password) {
                res.writeHead(400); // Bad Request
                return res.end('Empty login or password');
            }

            if (await db.isUserExist(user.login)) {
                res.writeHead(409); // Conflict
                return res.end('User already exist');
            }
            await db.addUser(user);
            res.writeHead(201); // Created
            return res.end('Registeration is successfull');
        } catch (e) {
            console.error("Registration error:", e); // Log the error
            res.writeHead(500); // Internal Server Error
            return res.end('Error: ' + e.message); // Send error message back
        }
    });
}

server.listen(3000);