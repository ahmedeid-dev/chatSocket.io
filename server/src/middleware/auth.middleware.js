import User from './../../database/model/user.model.js';
import { asyncHandler } from 'express-async-handler';

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });

    if (!user) return res.status(404).json({ message: 'User not found' });
    next();
})