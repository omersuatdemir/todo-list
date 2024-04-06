import mongoose from "mongoose";

const LocalUserSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    }
}, { versionKey: false, timestamps: true });

export const LocalUser = mongoose.model("LocalUsers", LocalUserSchema);