// pages/api/addDiscussion.js
import { addDiss } from '@/lib/database';
import { authToken } from '@/lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const user = await authToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { title, content } = req.body;
    const newDiscussion = await addDiss({ title, content }, user.userId);

    res.status(200).json({ message: 'Discussion added', discussion: newDiscussion });
}
