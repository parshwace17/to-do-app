import mongoose from "mongoose";
import { ITodoDoc } from "./todo.interfaces";

const todoSchema = new mongoose.Schema<ITodoDoc>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Todo model
const Todo = mongoose.model<ITodoDoc>("Todo", todoSchema);

export default Todo;
