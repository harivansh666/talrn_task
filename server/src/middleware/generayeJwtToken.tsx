import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";
dotenv.config();

export const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  res.cookie("auth", token);
  return token;
};
