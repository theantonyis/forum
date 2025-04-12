// pages/api/logout.js
export default function handler(req, res) {
    res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/');
    res.status(200).send('Logged out');
}
