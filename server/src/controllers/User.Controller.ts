import { Request, Response } from "express";
import bcrypt from "bcrypt"
import z from "zod"
import { generateToken } from "../middleware/generayeJwtToken";
import { UserModelAuth } from "../models/user.auth.model";

const SigninSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string(),
    role: z.string(),
    tech_Stack: z.string(),
    experience: z.string(),
    description: z.string().optional()
});


// /signin
export const Signin = async (req: Request, res: Response) => {
    try {
        const parsed = SigninSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: parsed.error,
            });
        }

        const { email, password, } = parsed.data;

        const user = await UserModelAuth.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        await generateToken(user._id.toString(), res)

        return res.status(200).json({
            success: true,
            message: "Signin successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isadmin: user.isadmin,
                role: user.role,
                tech_Stack: user.tech_Stack,
                experience: user.experience,
                description: user.description,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: "Internal server error",

        })
    }

};

// /signup

export const Signup = async (req: Request, res: Response) => {
    try {
        const parsed = SignUpSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: parsed.error,
            });
        }

        const { name, email, password, role, tech_Stack, experience, description } =
            parsed.data;

        // Clean up tech_Stack array - remove empty strings and trim
        const tech_Stack_array = tech_Stack
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);

        // console.log("name:", name, "email:", email, "password:", password, "role:", role, "tech stack:", tech_Stack_array, "experience:", experience, "description:", description);


        const exists = await UserModelAuth.findOne({ email: email });

        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const dbUser = await UserModelAuth.create({
            name,
            email,
            password: hashedPassword,
            role,
            tech_Stack: tech_Stack_array,
            description: description || null,
            experience,
        });
        console.log("dbUser", dbUser)

        await generateToken(dbUser._id.toString(), res)

        return res.status(201).json({
            success: true,
            message: "Signup successful",
            dbUser
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};
