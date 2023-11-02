import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "Please provide a task name"],
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
    usId: {
        type: String,
        required: [true, "Please provide a userId"],
    },
    
    isCompleted: {
        type: Boolean,
        default: false,
    }
})

const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema);
export default Task;