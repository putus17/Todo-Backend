import { Request, Response } from "express";
import { User } from '../models/authmodels'
import bcrypt from "bcrypt";
import { generateToken, handleError } from "../utils/authutils";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, phone, password } = req.body;
        if (!username || !phone || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name: username, phone, passwordHash });

    
        res.status(201).json({ user: { id: newUser._id, name: username, phone: newUser.phone } });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            res.status(400).json({ message: "Phone and password are required" });
            return;
        }

        const normalizedPhone = typeof phone === "string" ? Number(phone) : phone;

        const user = await User.findOne({ phone: normalizedPhone });
        if (!user) {
            res.status(400).json({ message: "Invalid phone or password" });
            return;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = generateToken({
            userid: user._id.toString(),
            phone: typeof user.phone === "number" ? user.phone : Number(user.phone),
        });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ message: "Login failed", error: (error as Error).message });
    }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(404).json({ success: false, message: "Unauthorized" });
            return;
        }
        const userObj = req.user.toObject?.() ?? req.user;
        const { passwordHash, ...safeUser } = userObj;
        res.status(200).json({ 
        
            data: safeUser,
            message: `Welcome back, ${safeUser.name}`,
        });
    } catch (error) {
        console.error('Error in auth route', error);
        res.status(500).json({ message: "Error fetching user", error: (error as Error).message });
    }
};
