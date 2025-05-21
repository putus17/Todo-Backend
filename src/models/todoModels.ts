import mongoose, { Schema } from "mongoose";
import { ITodo } from "../types/todo";

const profileSchema = new Schema<ITodo>({
    text: {
        type: String,
        required: true,
    },
    completed:{
        type:Boolean,
        default:false
    }

}, 
{     
    timestamps: true,
});
export default mongoose.model<ITodo>("Todo", profileSchema);