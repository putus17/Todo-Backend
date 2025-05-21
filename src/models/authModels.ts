import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/todo";

const userSchema: Schema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<IUser>("User", userSchema);
