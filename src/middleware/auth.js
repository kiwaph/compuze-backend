import jwt from 'jsonwebtoken';
import { findUserById } from '../services/user-service.js';

export async function checkAuth(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization)
        return res.status(401).json({ message: 'Authorization required' });

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);

        const user = await findUserById(decoded.userId)
        req.user = user;
        
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    next();
}