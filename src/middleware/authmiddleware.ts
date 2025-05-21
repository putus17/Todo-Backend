
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/authutils'
import { User } from '../models/authmodels'

export interface AuthenticatedRequest extends Request {
    user?: any;
    userId?: string;
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers['authorization']?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userid);

        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        req.user = user;
        req.userId = (user._id as string).toString();
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
};

