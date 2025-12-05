import z from "zod";
import { Request, Response } from "express"
import { UserModel } from "../models/user.model"

const EditDeveloperSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    tech_Stack: z.string().min(1, "Tech stack is required"),
    experience: z.string().min(1, "Experience is required"),
    description: z.string().optional()
});

export const GetDevelopers = async (req: Request, res: Response) => {
    try {
        const response = await UserModel.find()
        res.status(200).json({
            success: true,
            response
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false
        })
    }
}
export const PostDevelopers = async (req: Request, res: Response) => {
    try {
        const { name,
            role,
            tech_Stack,
            experience } = req.body
        const tech_Stack_array = tech_Stack.split(',')


        const response = await UserModel.create({
            name,
            role,
            tech_Stack: tech_Stack_array,
            experience

        })
        // console.log(response)
        return res.status(201).json({
            success: true,
            response
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false
        })

        
    }
}

export const GetDevelopersbyRole = async (req: Request, res: Response) => {
    try {
        const role = req.params.role as string;

        //  Sort by experience
        if (role === "sort") {
            const developers = await UserModel.aggregate([
                {
                    $addFields: {
                        expNum: { $toInt: "$experience" },
                    },
                },
                { $sort: { expNum: -1 } },
            ]);

            return res.status(200).json({ response: developers });
        }

        //  Filter by specific role
        if (role !== "All") {
            const developers = await UserModel.find({ role });
            return res.status(200).json({ response: developers });
        }

        //  Get all developers
        const developers = await UserModel.find();
        return res.status(200).json({ response: developers });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const EditDeveloper = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const parsed = EditDeveloperSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: parsed.error,
            });
        }

        const { name, role, tech_Stack, experience } = parsed.data;

        // console.log(name, role, tech_Stack, experience)

        const tech_Stack_array = tech_Stack
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);

        const updatedDeveloper = await UserModel.findByIdAndUpdate(
            id,
            {
                name,
                role,
                tech_Stack: tech_Stack_array,
                experience,
            },
            { new: true, runValidators: true }
        );

        if (!updatedDeveloper) {
            return res.status(404).json({ message: "Developer not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Developer updated successfully",
            updatedDeveloper

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

export const DeleteDeveloper = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        console.log(id)

        const deletedDeveloper = await UserModel.findByIdAndDelete({ _id: id });

        if (!deletedDeveloper) {
            return res.status(404).json({ message: "Developer not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Developer deleted successfully",

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};