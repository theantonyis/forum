// lib/auth.js
import { verifyAuthToken } from './database';

export const authToken = async (req) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;

    try {
        const decoded = verifyAuthToken(token); // Verify and decode JWT
        return decoded; // Decoded payload will contain userId and username
    } catch (error) {
        return null;
    }
};
