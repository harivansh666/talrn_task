import { Request, Response } from "express"
import { UserModel } from "../models/user.model"

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
            Experience } = req.body
        const tech_Stack_array = tech_Stack.split(',')

        console.log()

        const response = await UserModel.create({
            name,
            role,
            tech_Stack: tech_Stack_array,
            Experience

        })
        console.log(response)
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