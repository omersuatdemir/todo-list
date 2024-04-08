import mongoose from "mongoose";

const MainUserSchema = new mongoose.Schema({
    googleID: {
        type: mongoose.Schema.Types.String,
        unique: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
    },
    email: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
}, { versionKey: false, timestamps: true });

export const MainUser = mongoose.model("MainUsers", MainUserSchema);