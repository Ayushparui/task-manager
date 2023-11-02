import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, "Please provide a date"],
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
})
