import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    tech_Stack: [{
        type: String,
        required: true
    }],
    experience: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: ""
    },
    admin: {
        type: Boolean,
    }
}, { timestamps: true })

export const UserModel = mongoose.model("user", UserSchema)