import dotenv from "dotenv";
dotenv.config();

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModelAuth } from "../models/user.auth.model";

declare module "express-serve-static-core" {
    interface Request {
        user?: any;
    }
}

interface AuthPayload extends JwtPayload {
    userId: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.auth;

        if (!token) {
            return res.status(401).json({ message: "No authentication token provided" });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET missing in .env");
        }

        let decoded: any;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthPayload;
        } catch {
            return res.status(401).json({ message: "invalid or expired token" });
        }

        const user = await UserModelAuth.findOne({
            _id: decoded.userId
        });

        if (!user) {
            return res.status(401).json({ message: "unauthorized - user not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Protect error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};