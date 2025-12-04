import mongoose from "mongoose";
import { string } from "zod";

const userAuthSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        role: {
            type: String,
        },

        tech_Stack: [{
            type: String,
            required: true
        }],

        description: {
            type: String,
        },

        experience: {
            type: String,
        },

        password: {
            type: String,
            required: true,
        },

        isadmin: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
    }
);

export const UserModelAuth = mongoose.model("UserModel", userAuthSchema);
