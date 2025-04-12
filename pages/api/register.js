import { getUserByLogin } from '@/lib/database';
import { generateAuthToken, verifyPassword } from '@/lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { login, password } = req.body;
    const user = await getUserByLogin(login);

    if (!user) return res.status(401).send('Invalid username');

    const valid = await verifyPassword(password, user.password, user.salt);
    if (!valid) return res.status(401).send('Invalid password');

    const token = generateAuthToken(user._id, login);
    res.status(200).json({ token });
}
