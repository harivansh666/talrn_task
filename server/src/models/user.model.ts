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
    Experience: {
        type: Number,
        required: true
    }
})

export const UserModel = mongoose.model("user", UserSchema)