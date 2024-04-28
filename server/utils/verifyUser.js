import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("Token from cookies:", token);

    if (!token) {
        console.log("No access token found");
        return next(errorHandler(401, 'Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log("Error verifying token:", err.message);
            return next(errorHandler(401, 'Unauthorized'));
        }
        
        console.log("Token verified successfully. User:", user);
        req.user = user;
        next();
    });
};