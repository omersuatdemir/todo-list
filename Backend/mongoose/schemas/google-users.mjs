import mongoose, { Mongoose } from "mongoose";

const GoogleUserSchema = new mongoose.Schema({
    googleID: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
}, { versionKey: false, timestamps: true });

export const GoogleUser = mongoose.model("GoogleUsers", GoogleUserSchema);