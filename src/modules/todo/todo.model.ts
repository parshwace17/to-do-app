import mongoose from "mongoose";
import { ITodoDoc, ITodoModel } from "./todo.interfaces";
import { toJSON } from "../toJSON";
import paginate from "../paginate/paginate";

const todoSchema = new mongoose.Schema<ITodoDoc, ITodoModel>(
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
todoSchema.plugin(toJSON);
todoSchema.plugin(paginate);

// Create the Todo model
const Todo = mongoose.model<ITodoDoc, ITodoModel>("Todo", todoSchema);

export default Todo;
