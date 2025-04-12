// pages/api/discussions.js
import { getDiss } from '@/lib/database';
import { authToken } from '@/lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const user = await authToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const discussions = await getDiss(user.userId);
    res.status(200).json(discussions);
}
